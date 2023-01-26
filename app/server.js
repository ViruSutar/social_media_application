const app = require('./app')
const connectDb = require("./Config/db");

// database
connectDb();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});
