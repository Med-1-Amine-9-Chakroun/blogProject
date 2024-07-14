const express = require("express");

const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  console.log(1);
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  console.log(2);
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: req.params.id, content });

  commentsByPostId[req.params.id] = comments;
  console.log(3);
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening at port 4001");
});
