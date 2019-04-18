const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/lfg', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const posts = require("./posts.js");
app.use("/api/posts", posts.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.listen(3007, () => console.log('Server listening on port 3007!'));
