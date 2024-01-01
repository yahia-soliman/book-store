require("dotenv").config();
require("./database");
const express = require("express");
const mongoose = require("mongoose");
const booksRouter = require("./routers/books.router");
const usersRouter = require("./routers/users.router");
const userAuth = require("./middlewares/user.auth");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
// mount the root of the server to the public folder
// serves static pages
app.use(express.static("public"));

app.use("/users/", usersRouter);
app.use(userAuth);
app.use("/api/books/", booksRouter);

// only start listening when there is a database connection
mongoose.connection.once("open",()=>{
	app.listen(port, () => console.log(`listening on port ${port}`));
});
