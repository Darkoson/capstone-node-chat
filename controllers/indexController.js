const express = require('express');
const app = express();
app.use(express.json());


exports.getIndex = async (req, res) => {
    res.render('index', { 
        title: 'ChatApp | Home page',
        path: '/',
        isAuthenticated: req.isAuthenticated
    });
} ;
