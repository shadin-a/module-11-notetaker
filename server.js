const { json } = require('express');
const express = require('express');
//const db = require('./db/db.json');
const fs = require('fs');
//const uid = new ShortUniqueId({ length: 10 });

const PORT = 3000;
const app = express();

//ROUTE FOR LANDING PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.Develop/public/index.html'));
})

//ROUTE FOR API/NOTES PAGE
app.get('/notes', (req, res) => {
  fs.readFile('/Develop/db/db.json', function (err, data) {
    var getNoteData = json.parse(data);
    res.json(getNoteData)
  });
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

//ROUTE TO POST NOTES
app.post('/api/notes', (req,res) => {
    const{title, text} = req.body;
    if (req.body){
        const newSavedNote = {
            title,
            text,
            id: uid(),
        };
        fs.readFile('/Develop/db/db.json', function (err, data) {
            let parsedData = json.parse(data);
            parsedData.push(newSavedNote)
            fs.writeFile('/Develop/db/db.json', JSON.stringify(parsedData), (err) => {
            err
            ? console.error(err)
            : console.log('data parsed successfuly') 
            
            }
        )}
    )}
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

//ROUTE TO DELETE NOTES
app.delete('/api/notes/:id', (req, res) =>{
    let unwantedID = req.params.id
    fs.readFile('/Develop/db/db.json', function (err, data) {
        let oldNotes = json.parse(data)
        let newNotes = oldNotes.filter(object => object.id !== unwantedID);
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) =>
        err
        ? console.error(err)
        : res.json(newNotes)   
        );
    });
})

// PORT LISTENING ROUTE
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})