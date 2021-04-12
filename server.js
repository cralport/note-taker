const express = require('express');
const path = require('path');
const fs = require('fs');
const { RSA_NO_PADDING } = require('constants');


const app = express();
const PORT = process.env.PORT || 3001;
const mainDir = path.join(__dirname, '/public');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(mainDir, 'notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(mainDir, 'index.html'));
});

app.post('/api/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    let newNote = req.body;
    let uniqueId = (savedNotes.length).toString();
    newNote = uniqueId;
    savedNotes.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content:" newNote);
    res.json(savedNotes);
});

app.delete('/api/notes/:id', (req, res) => {

})


app.post('/api/notes', (req, res) => {
    let stuff = req.body
    console.log(stuff);
    res.end()

})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
