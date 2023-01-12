const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./Config/db");
const app = express();

dotenv.config({ path: "./.env" });

// database
connectDb();

// Parse request body as JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// Routes
app.use('/api/Auth',require('./Routes/AuthRoutes'))
app.use('/api/Post',require('./Routes/PostRoutes'))
app.use('/api/Comment',require('./Routes/CommentRoutes'))
app.use('/api/Like',require('./Routes/LikeRoutes'))
app.use('/api/User',require('./Routes/FollowerRoutes'))



const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
