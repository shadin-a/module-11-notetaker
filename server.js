const express = require('express');
//const db = require('./db/db.json');
const fs = require('fs');
const uid = new ShortUniqueId({ length: 10 });

const PORT = 3000;
const app = express();

//ROUTE FOR LANDING PAGE
app.get('/', (req, res) => {
    res.sendFile('/Develop/public/index.html');
})

//ROUTE FOR API/NOTES PAGE
app.get('/notes', (req, res) => {
    let data = fs.readFileSync('Develop/db/db.json');
    let notes = JSON.parse(data);
    let formattedNotes = JSON.stringify(notes);
    console.log(formattedNotes);
     //renderNoteList(notes);
    // add existin notes rendering in left hand column
    res.sendFile('/Users/shadinalarab/2022 BOOTCAMP/miniature-eureka/Develop/public/notes.html');
})

//ROUTE TO POST NOTES
app.post()
// add an endpoint for saving and hook up to save icon
// save icon writes to db and immediately appears in left column

// endpoint for looking at a specific note in right hand column

//trash icon route for specific notes

// some write icon stuff i dont really get yet, but its another endpoint

// PORT LISTENING ROUTE
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})