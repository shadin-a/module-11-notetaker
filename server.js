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
    fs.readFile('Develop/db/db.json', function (err, data) {
        var db = JSON.parse(data);
        res.json(db)
      });
      });  
    
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))
    );

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
        fs.readFile('Develop/db/db.json', 'utf8', (err, data) => {
            let parsedData = JSON.parse(data);
            parsedData.push(newSavedNote)
            fs.writeFile(path.join(__dirname,'/Develop/db/db.json'), JSON.stringify(parsedData), (err) =>
            err
            ? console.error(err)
            :console.log('Success on reading the post thing!')
            );
        }
    )}
     else {
        console.log("there was an error");
        }
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
    })

//ROUTE TO DELETE NOTES
app.delete('/api/notes/:id', (req, res) =>{
    let unwantedID = req.params.id
    fs.readFile('Develop/db/db.json', function (err, data) {
        let oldNotes = JSON.parse(data)
        let newNotes = oldNotes.filter(object => object.id !== unwantedID);
        fs.writeFile('Develop/db/db.json', JSON.stringify(newNotes), (err) =>
        err
        ? console.error(err)
        :console.log('Success on reading the delete thing!')
        );
    });
    res.sendFile(path.join(__dirname, '.public/notes.html'));
})

// PORT LISTENING ROUTE
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})