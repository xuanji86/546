const express = require('express');
const router = express.Router()
const users = require("../users.js");
const bcrypt = require("bcryptjs");
let logout_flag = false


router.get('/', async(req, res) => {
    if(req.session.user){
        res.redirect('/private');
        logout_flag = false;
    } else{
        res.render('login', {logout_flag: logout_flag});
    }
});

router.post('/login', async(req, res) => {

    if(!req.body || !req.body.username || !req.body.password){
        error_message = ""
        if(!req.body.username) error_message += "missing username."
        if(!req.body.password) error_message += "missing password."
        logout_flag = false;
        res.status(401).render('login', {error_flag: true, message: error_message, logout_flag: logout_flag})
        
        return
    }

    try{
        for(let i = 0; i < users.length; i++){
            let each_user = users[i];
            if(await bcrypt.compare(req.body.password, each_user.hashedPassword) && each_user.username === req.body.username){
                req.session.user = each_user;
                res.cookie("name", "AuthCookie");
                res.redirect('/private');
                logout_flag = false;
                return 
            }
        }
        logout_flag = false;
        res.status(401).render('login', {error_flag: true, message: "user name or password is not valid", logout_flag: logout_flag});
        return

    } catch(e){
        console.log(e)
        return
    }
});

router.get('/private', async(req, res) => {
    logout_flag = false;
    res.render('private', {user: req.session.user});

});

router.get('/logout', (req, res) => {
    req.session.destroy()
    logout_flag = true;
    res.redirect('/');
});


module.exports = router;
