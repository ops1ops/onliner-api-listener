require("dotenv").config();
const express = require("express");
var path = require('path');
var routes = require('./routes/index');
var users  = require('./routes/users');
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.set("json spaces", 4);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
