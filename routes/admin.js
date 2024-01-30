const express = require('express');
const routes = express.Router();
const adminController = require('../controllers/adminController');
const Admin = require('../models/admin');

const passport = require('passport');
const passportlocal = require('../config/passport_local_strategy');





routes.get('/', async(req,res)=>{
    if(req.cookies.adminName){
        return res.redirect("/admin/deshboard");
    }
    return res.render('login')
})

routes.get("/redirectfail", async(req,res)=>{
    req.flash('error',"Invalid Login !!!");
    return res.redirect('/admin/')
})


//// Admin ////

routes.get("/deshboard",passport.checkAuthentication, adminController.deshboard);
// add admin
routes.get("/add_admin",passport.checkAuthentication,adminController.add_admin);
routes.post("/addAdminData",passport.checkAuthentication,Admin.uploadAdminImage,adminController.addAdminData)
// view admin
routes.get("/view_admin",passport.checkAuthentication,adminController.view_admin);
routes.get("/setDeactive/:id",passport.checkAuthentication,adminController.setDeactive);
routes.get("/setActive/:id",passport.checkAuthentication,adminController.setActive);
routes.get("/deleteAdminData/:id",passport.checkAuthentication,adminController.deleteAdminData);
routes.get("/updateAdminData/:id",passport.checkAuthentication,adminController.updateAdminData);
routes.post("/EditAdminData",passport.checkAuthentication,Admin.uploadAdminImage,adminController.EditAdminData);
routes.post("/deleteAllAdmin",passport.checkAuthentication,adminController.deleteAllAdmin)

// profile
routes.get("/profile",passport.checkAuthentication,adminController.profile);
routes.post("/EditprofileData",passport.checkAuthentication,Admin.uploadAdminImage,adminController.EditprofileData)

// change Password
routes.post("/changepassword",passport.checkAuthentication,adminController.changepassword);

// login
routes.post("/checklogin",passport.authenticate('local',{failureRedirect:"/admin/redirectfail"}),adminController.checklogin)
// forgotten pass
routes.get("/mailpage",async(req,res)=>{
    return res.render("forgottenpass/mailpage")
})
routes.post("/checkmail",adminController.checkmail);
routes.get("/otp_page",async(req,res)=>{
    return res.render("forgottenpass/otp_page")
})
routes.post("/checkotp",adminController.checkotp);
routes.get("/resetPass",async(req,res)=>{
    return res.render("forgottenpass/resetPass");
})
routes.post("/verifyPass",adminController.verifyPass);

// Log-out
routes.get("/logout",async(req,res)=>{
    req.session.destroy();
    return res.redirect("/admin");
})

// Login With Google
routes.get('/google',passport.authenticate('google',{scope : ['profile','email']}));
routes.get('/google/callback',passport.authenticate('google',{failureRedirect :'/admin/login'}),adminController.checklogin);

////  Routing ////
routes.use("/category",passport.checkAuthentication,require('./category'));
routes.use("/sub_category",passport.checkAuthentication,require('./sub_category'));
routes.use("/extra_category",passport.checkAuthentication,require('./extra_category'));
routes.use("/brand",passport.checkAuthentication,require('./brand'));
routes.use("/type",passport.checkAuthentication,require('./type'));
routes.use("/product",passport.checkAuthentication,require('./product'));

module.exports = routes;