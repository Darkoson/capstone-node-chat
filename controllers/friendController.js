const { request } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const { User, Friendrequest, Friends } = require('../models');


exports.getFriendRequests = async (req, res) => {
    const authToken = await req.cookies['jwt'];
    const users = await User.findAll();
    const pending = [];
    let userId ;
    const pendingRequest = [];

    users.forEach(user => {
        if(user.token === authToken){
            pending.push(user)
        };
    }); 

    for(let i of pending){ userId = i };
    const friendRequests = await Friendrequest.findAll({ where: { userTwo: userId.id }, include : 'user' });
    friendRequests.forEach(friendrequest => { pendingRequest.push(friendrequest['user']) });
    users.forEach(user => {
        if(user.token === authToken){
            res.render('friends/friendrequests', { 
                title: 'ChatApp | Friends Requests',
                path: '/friendrequests',
                isAuthenticated: authToken,
                username: user.username,
                users: users,
                successMessage: req.flash('success'),
                friendRequests: pendingRequest
            });
        };
    }); 
};

exports.getMakeFriends = async (req, res) => {
    const authToken = await req.cookies['jwt'];
    const users = await User.findAll();

    users.forEach(user => {
        if(user.token === authToken){
            res.render('friends/makefriends', { 
                title: 'ChatApp | Make Friends',
                path: '/makefriends',
                isAuthenticated: authToken,
                username: user.username,
                users: users,
                successMessage: req.flash('success')
            });
        };
    }); 
};

exports.getFriends = async (req, res) => {
    const authToken = await req.cookies['jwt'];
    const users = await User.findAll();
    const pending = [];
    let userId;
    const friendDetails = [];

    users.forEach(user => {
        if(user.token === authToken){
            pending.push(user)
        };
    }); 

    for(let i of pending){ userId = i };
    const friends = await Friends.findAll({ where: { userTwo: userId.id }, include : 'user' });
    friends.forEach(friend => {
        friendDetails.push(friend['user']);
    })

    users.forEach(user => {
        if(user.token === authToken){
            res.render('friends/friends', { 
                title: 'ChatApp | Friends',
                path: '/friends',
                isAuthenticated: authToken,
                username: user.username,
                successMessage: req.flash('success'),
                friendDetails
            });
        };
    }); 
}

exports.sendRequest = async (req, res) => {
    const authToken = await req.cookies['jwt'];
    const users = await User.findAll();
    users.forEach(user => {
        if(user.token === authToken){
            const { id } = req.params;
            Friendrequest.create({
                userOne: user.id,
                userTwo: id,
                userId: user.id
            });
        req.flash('success', 'Friend Request Sent Successfully');
        res.redirect('/friends');
        }
    }); 
};

exports.acceptRequest = async (req, res) => {
    const authToken = await req.cookies['jwt'];
    const users = await User.findAll();
    users.forEach(user => {
        if(user.token === authToken){
            const { id } = req.params;
            Friends.create({
                userOne: user.id,
                userTwo: id,
                userId: user.id
            });
            Friends.create({
                userOne: user.id,
                userTwo: user.id,
                userId: id
            });
        req.flash('success', 'You just made a new friend');
        res.redirect('/friends');
        }
    }); 
}

exports.declineRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = Number(id);
        const userDeclined = await Friendrequest.findOne({ where: { userId: userId } });
        userDeclined.destroy(userId);
        req.flash('success','You have successfully declined a request');
        res.redirect('/friendrequests');
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })
    }
}

exports.unFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = Number(id);
        const unFriend = await Friends.findOne({ where: { userId: userId } });
        unFriend.destroy(userId);
        req.flash('success','You have successfully unfriend a user');
        res.redirect('/makefriends');
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error })
    }
}
