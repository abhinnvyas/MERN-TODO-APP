const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); //creating the express app
const PORT = process.env.PORT || 3001;

app.use(express.json()); //to use content-type json in our requests
app.use(cors()); //to block any cross origin requests

mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => console.log("Connected to DB..."))
  .catch((error) => console.error(error));

const Todo = require("./models/Todo");

//READ
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//CREATE
app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();

  res.json(todo);
});

//DELETE
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

//UPDATE
app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  todo.save();

  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
