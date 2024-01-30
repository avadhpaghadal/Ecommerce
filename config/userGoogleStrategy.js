const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(new googleStrategy({
    clientID: "112871611169-u2p9beep2a89geeap5uut3l72di30jt0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9001/google/callback"
},

    async function(accessToken, refreshToken, profile, cb) {
      let checkemail = await user.findOne({email : profile.emails[0].value});
        console.log(profile);
      if(checkemail){
        return cb(null,checkemail)
      }
      else{
        let userDetails = {
            role : 'user',
            username :profile.displayName,
            email : profile.emails[0].value,
            password :  await bcrypt.hash('12345',10),
            create_date : new Date().toLocaleString(),
            updated_date : new Date().toLocaleString(),
        }
        let userRecord = await user.create(userDetails)
        if(userRecord){
            return cb(null,userRecord)
        }
        else{
            return cb(null,false)
        }
      }
    }
))

module.exports = passport;