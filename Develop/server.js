//Requiring express and other dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//Makes express usable
let app = express();
let notes = require("./db/db.json");
let PORT = process.env.PORT || 3001;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//Making a route to get to the notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//This is creating a new note and posting it
app.post("/api/notes", function (req, res) {
  let id = Math.random();

  let userNote = {
    id: id,
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(userNote);
  const stringifiedNote = JSON.stringify(notes);
  res.json(notes);
  fs.writeFile("db/db.json", stringifiedNote, (error) => {
    if (error) console.log(error);
    else {
      console.log("Note saved");
    }
  });
});

app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    res.json(notes);
  });
});

//This will help Express listen to set up the server
app.listen(PORT, function () {
  console.log("Server Running " + `http://localhost:${PORT}`);
});