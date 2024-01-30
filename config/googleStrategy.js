const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const admin = require('../models/admin');

passport.use(new googleStrategy({
    clientID: "938908492477-ug8dqpvnu446rioq0vpo0noc1f5b9829.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9001/admin/google/callback"
},

    async function(accessToken, refreshToken, profile, cb) {
      let checkemail = await admin.findOne({email : profile.emails[0].value});

      if(checkemail){
        return cb(null,checkemail)
      }
      else{
        console.log(profile.photos[0].value);
        let adminDetails = {
            role : 'admin',
            name :profile.displayName,
            email : profile.emails[0].value,
            password : '12345',
            isActive : 'true',
            create_date : new Date().toLocaleString(),
            updated_date : new Date().toLocaleString(),
            adminImage :  profile.photos[0].value
        }
        let adminrecord = await admin.create(adminDetails)
        if(adminrecord){
            return cb(null,adminrecord)
        }
        else{
            return cb(null,false)
        }
      }
    }
))

module.exports = passport;