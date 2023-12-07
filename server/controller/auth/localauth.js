const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../../models");



passport.use(new LocalStrategy({usernameField: "email",passwordField: "password"},async (email, password, done) => {

    try {
        const theuser = await User.findOne({ where: { email } ,include:["usertokens"]});
        if (!theuser) {
            return done(null, false, { message: 'Incorrect username or password.' });
            console.log("'Incorrect user or username.'")

        }
        const passwordMatch = await bcrypt.compare(password, theuser.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password or username.' });
            console.log("'Incorrect password or username.'")
        }
        return done(null, theuser);
    } catch (err) {
        return done(err);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const theuser = await User.findOne({where:{id}});
        done(null, theuser);
    } catch (err) {
        done(err);
    }
});
