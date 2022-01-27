const express = require('express');
const app = express();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.json());


exports.postSign = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        
        if (!(username && email && password, confirmPassword)) {
            req.flash('error', 'All input fields are required');
            res.redirect('/signup');
        }
        const oldUser = await User.findOne({ where: { email } });
        if (oldUser) {
            req.flash('error', 'User Already Exist. Please Login');
            res.redirect('/signup');
        } else {
            encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                username,
                email,
                password: encryptedPassword,
            });

            const token = jwt.sign(
                { userId: user.id, email },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                }
            );
            user.token = token;

            await user.save();
            req.flash('success', 'Registration is successful. Please Login');
            res.redirect('/signup');
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ success:false, message: error });
    }
}

exports.postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            req.flash('error', 'All input fields are required');
            res.redirect('/login');
        }

        const user = await User.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { userId: user.id, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );

            user.token = token;
            await user.save();

            res.cookie('jwt',token, { httpOnly: true, maxAge: 3600000 });

            req.session.isLoggedIn = true;

            res.redirect('/chats');
        }

        req.flash('error', 'Invalid Credentials');
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        await res.status(404).json( {success: false, message: error});
    }
};

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        title: 'ChatApp | Login',
        path: '/login',
        isAuthenticated: req.isAuthenticated,
        errorMessage: req.flash('error')
    })
};

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        title: 'ChatApp | Signup',
        path: '/signup',
        isAuthenticated: req.isAuthenticated,
        errorMessage: req.flash('error'),
        successMessage: req.flash('success')
    })
};

exports.getLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

