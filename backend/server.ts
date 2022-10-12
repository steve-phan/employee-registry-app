import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT || 2022;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World 11");
});

// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
