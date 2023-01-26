const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./.env" });



// Parse request body as JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from server");
});

app.get("/test", (req, res) => {
  res.status(200).send("testing route for test cases");
});


// Routes
app.use('/api/Auth',require('./Routes/AuthRoutes'))
app.use('/api/Post',require('./Routes/PostRoutes'))
app.use('/api/Comment',require('./Routes/CommentRoutes'))
app.use('/api/Like',require('./Routes/LikeRoutes'))
app.use('/api/User',require('./Routes/FollowerRoutes'))


module.exports = app;