require("dotenv").config()
const { User, Token, Artist} = require("../models");
const {generatetoken} =require("./library/mylib");
require ("./auth/localauth") ;
require ("./auth/googleauth");
const  fs = require("fs")
const  path = require("path")
const jwt = require("jsonwebtoken");
const  bcrypt=require("bcrypt")
const  handbars=require("handlebars")

const  passport= require("passport");
const  {validationResult} =require("express-validator");
const  transportergmail = require("./library/transportergmail")




module.exports.login =  (req, res, next) => {

    console.log("================ login ======================")
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); 
        }
        if (!user) {
            return res.status(404).json({message:"user not found"}); // Redirect to the login page on failure
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Redirect to a success page or do something else on successful login
            return res.status(200).json({userwithtoken:user,"isauth":req.isAuthenticated()}); // Redirect to the login page on failure
        });
    })(req, res, next);
};
module.exports.regester = async (req, res,next) => {
    const { firstName, lastName, email, phonenumber, password,country,city } = req.body;
    console.log(req.body)
    const errorsfield =validationResult(req);
    if (!errorsfield.isEmpty()) {
        return res.status(422).json({ errors: errorsfield.array() });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
        res.status(400).json({ error: "This email already exists" });
    } else {
        bcrypt.hash(password, 10, (error, hash) => {
            User.create({ firstName, lastName, email, phonenumber, password: hash }).then((result) => {
                // Create a token
                const newtoken = generatetoken({ email: result.dataValues.email, pass:result.dataValues.password });
                Token.create({  Userid: result.dataValues.id ,"token":newtoken}).then((tokenfilled) => {
                res.redirect(307,"/acount/login")
                }).catch((error) => {
                 return    res.status(404).json({ error: error });
                });
            });
        });
    }
};
module.exports.registerByGoogle = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })(req, res, next);
};
module.exports.forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "This email does not exist. Please sign up." });
        }

        const keyPrivate = process.env.JSON_WEB_TOKEN_SECRET_KEY; // Use a single secret key
        const token = await jwt.sign({ "email": user.email }, keyPrivate, { expiresIn: "1h" });

        const readhtml = fs.readFileSync(path.join(__dirname, '../public/resetpass.html'), 'utf8');
        const htmlhandbars = handbars.compile(readhtml);
        const replacements = {
            "linktosend": "http://localhost:3000/resetpassword/?token=" + token + "&id=" + user.id + "&fullname=" + user.firstName + " " + user.lastName,
            "fullname": user.firstName + " " + user.lastName,
        };
        const htmltosend = htmlhandbars(replacements);
        const mailOptions = {
            from: 'omarlamzah64@gmail.com',
            to: email,
            subject: 'Reset Password',
            html: htmltosend,
        };


        transportergmail.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ message: "Email sent: " + info.response });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const  user_with_token = async(token)=> {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                include: ["usertokens"],
                where: { "$usertokens.token$": token }
            });
            if (!user) {
                throw new Error("User not found");
            }
            const artist = await Artist.findOne({ where: { "userid": user.id } });
            if (!artist) {
                resolve({
                    "user": user.dataValues,
                    "artist": "Artist not found" // artist not found
                });
            } else {
                resolve({
                    "user": user.dataValues,
                    "artist": artist.dataValues
                });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            reject(error); // Reject with the error
        }
    });
}

module.exports.updatePassword = async (req, res) => {
    try {
        const token = req.body.token;
        const userId = req.body.id;
        const user = await User.findOne({ where: { id: userId }, include: ["usertokens"] });

        const keyPrivate = process.env.JSON_WEB_TOKEN_SECRET_KEY;
        const decoded = jwt.verify(token, keyPrivate);

        if (decoded) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.update({ "password": hashedPassword }, { where: { id: userId } });

            // Call the user_with_token function and await its result
            const user_with_token_result = await user_with_token(user.usertokens.token);
            return res.status(200).json({ user_with_token: user_with_token_result });

        } else {
            return res.status(403).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};




