# Chat Application
This a simple web application made with Express, Node.js, socket.io, Postgres

## Symbol Meaning
❌ - Incomplete
✔️ - Complete
## Features / Requirements
1. Should be able to signup & login with an email and password. ✔️
2. Should be able to send and accept friend. ✔️
3. Should be able to unfriend.✔️
4. Should be able to send text messages and one file per message to friends. ❌


## How to set up locally

1. Clone the project.
2. Change the file in config/config.example.json to config/config.json. [DB set-up: Postrgres].
3. Change the example.env file to .env .
4. Run 
```sh
$ npm install 
```
5. Run
```sh
$ sequelize db:migrate
```

## Heroku Deployment Link
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://capstone-chatapp.herokuapp.com)
