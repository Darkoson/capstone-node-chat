const express = require('express');
const app = express();
app.use(express.json());
const { User } = require('../models');


exports.getIndex = async (req, res) => {
    const authToken = await req.cookies['jwt'];
    const users = await User.findAll();
    users.forEach(user => {
        if(user.token === authToken){
            res.render('chats/index', { 
                title: 'ChatApp | Chat Page',
                path: '/chats',
                isAuthenticated: authToken,
                users: users,
                username: user.username
            });
        }
    }); 
}









