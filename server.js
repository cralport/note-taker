const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
let allNotes;

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    readFileAsync(path.join(__dirname, './db/db.json'), 'utf8')
        .then(function (data) {
            return res.json(JSON.parse(data));
        });
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    readFileAsync(path.join(__dirname, './db/db.json'), 'utf8')
        .then(function (data) {
            allNotes = JSON.parse(data);
            if (newNote.id || newNote.id === 0) {
                let currNote = allNotes[newNote.id];
                currNote.title = newNote.title;
                currNote.text = newNote.text;
            } else {
                allNotes.push(newNote);
            }
            writeFileAsync(path.join(__dirname, './db/db.json'), JSON.stringify(allNotes))
                .then(function () {
                    console.log('Wrote db.json');
                });
        });
    res.json(newNote);
});
app.delete("/api/notes/:id", (req, res) => {
    var id = req.params.id;
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            allNotes = JSON.parse(data);
            allNotes.splice(id, 1);
            writeFileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(allNotes))
                .then(function () {
                    console.log("Deleted db.json");
                })
        });
    res.json(id);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
