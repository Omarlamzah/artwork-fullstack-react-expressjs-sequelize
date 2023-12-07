const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User, Token } = require("../../models");
const { generatetoken } = require("../library/mylib");

passport.use(new GoogleStrategy({
        clientID: "312037713949-7n4ptm3gl10rt7t6e68q3vj2um5jugnp.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/acount/auth/google/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {

        const userdata ={
      firstName: profile.name.givenName || ''
      //firstName:  'abass'

      , lastName: profile.name.familyName || '', email: profile.email || '', pic: profile.picture || ''};
     User.findOne({where:userdata,include:["usertokens"]}).then((userwithtoken)=>{

         if(userwithtoken){  return done(null,{userwithtoken:userwithtoken.dataValues})}
         else {
             // user creat
             User.create(userdata)
                 .then( (usercreated) => {
                     const newtoken =  generatetoken({email: usercreated.dataValues.email  , firstName: usercreated.dataValues.firstName  || '', lastName: usercreated.dataValues.lastName  || ''});
                     console.log(newtoken)
                     Token.create({ token: newtoken, Userid: usercreated.dataValues.id})
                         .then((tokencreated) => {
                             return done(null, {"user": usercreated.dataValues, "token": tokencreated.dataValues});
                         })
                         .catch((err) => {
                             console.error("Error creating token:", err);
                             return done(null, {"message": "error create token", err});
                         });

                     console.log(usercreated);
                 })
                 .catch((err) => {
                     console.error("Error creating user:", err);
                     return done(null, { "message": "error create user", "error": err });
                 });
             // end user creat
         }

     }).catch((notfind_err)=>{

     })

    }
));

passport.serializeUser((userandtoken, done) => {
    done(null, userandtoken.user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const theuser = await User.findOne({ where: { id } });
        done(null, theuser);
    } catch (err) {
        console.error("Error deserializing user:", err);
        done(err);
    }
});

