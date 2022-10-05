const { json } = require('express');
const express = require('express');
let db = require('./Develop/db/db.json');
const fs = require('fs');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId({ length: 10 });
const path = require('path');


const PORT = 3000;
const app = express();

//MIDDLEWARE
app.use(express.static('Develop/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTE FOR LANDING PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
})

//ROUTE FOR NOTES PAGE
app.get('/notes', (req, res) => {
//   fs.readFile('/Develop/db/db.json', function (err, data) {
//     var getNoteData = json.parse(data);
//     res.json(getNoteData)
//   });
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});
//ROUTE TO GET API
app.get('/api/notes', (req,res) => {
    db = require('./Develop/db/db.json');
    res.json(db)
})

//ROUTE TO POST NOTES
app.post('/api/notes', (req,res) => {
    console.log(req.body);
    const {title, text} = req.body;
    if (req.body){
         var newSavedNote = {
            title,
            text,
            id: uid(),
        };
        var diego = fs.readFileSync('Develop/db/db.json', {})
            const parsedData = JSON.parse(diego);
            parsedData.push(newSavedNote)
            fs.writeFileSync(path.join(__dirname,'/Develop/db/db.json'), JSON.stringify(parsedData))
        }
     else {
        console.log("there was an error");
        }
    res.json(req.body);
    });

//ROUTE TO DELETE NOTES
app.delete('/api/notes/:id', (req, res) =>{
    let unwantedID = req.params.id
    fs.readFile('Develop/db/db.json', function (err, data) {
        let oldNotes = JSON.parse(data)
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