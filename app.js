const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { sequelize } = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(flash());


// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const friendRoutes = require('./routes/friend');
const chatsRoutes = require('./routes/chats');


app.use(indexRoutes);
app.use(authRoutes);
app.use(chatRoutes);
app.use(chatRoutes);
app.use(friendRoutes);
app.use(chatsRoutes);



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await sequelize.authenticate();
    console.log('Database synced!');
});

const io = require('socket.io')(server)

let socketsConected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
  console.log('Socket connected ', socket.id)
  socketsConected.add(socket.id)
  io.emit('clients-total', socketsConected.size)

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
    socketsConected.delete(socket.id)
    io.emit('clients-total', socketsConected.size)
  })

  socket.on('message', (data) => {
    // console.log(data)
    socket.broadcast.emit('chat-message', data)
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}
