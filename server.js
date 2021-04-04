const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const path = require('path');

const PORT = process.env.PORT || 3001;

// app.get('/api/animals', (req, res) => {
//     let results = animals;
//     if (req.query) {
//         results = filterByQuery(req.query, results);
//     }
//     res.json(results);
// });

app.get('/api/notes', (req, res) => {
    res.json([]);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.post('/api/notes', (req, res) => {
    let stuff = req.body
    console.log(stuff);
    res.end()

})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
