const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

//These allow us to use json as well as extended json.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

app.listen(process.env.PORT || 3000);