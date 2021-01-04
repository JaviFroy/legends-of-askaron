const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//MONGO ATLAS
const db = "assets";
const user="client";
const password="client";
const mongoString = "mongodb+srv://"+user+":"+password+"@realmcluster.uidt7.mongodb.net/" + db + "?retryWrites=true&w=majority"
mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on("error", function (error) {
    console.log(error)
})
mongoose.connection.on("open", function () {
    console.log("Connected to MongoDB database " + db)
})

const { Schema } = mongoose;
const elementSchema = new Schema({
    name: String,
    icon: String,
    color: String,
    description: String
}, { strict: false }, { versionKey: false });
const Element = mongoose.model('elements', elementSchema);

const characterSchema = new Schema({
    id: String,
    name: String,
    image: String,
    mode: String,
    age: Number,
    mom_race: Object,
    dad_race: Object,
    first_element: Object,
    second_element: Object,
    equip: Object,
    attributes: Object,
    description: String
}, { strict: false }, { versionKey: false });
const Character = mongoose.model('characters', characterSchema, 'characters');

// GET INI
app.get('/', function(req,res, next){
    var pm="WELCOMO TO LEGENDS OF ASKARON"
    console.log(pm);
    res.send(pm);
})


// GET ALL CHARACTERS
app.get('/characters', function (req, res, next) {
    const query = Character.find();
    query.sort('_id');
    query.select("-_id -__v");
    // execute the query at a later time
    query.exec(function (err, characters) {
        if (err) return handleError(err);
        console.log(characters)
        res.send(characters);
    });
})

// GET CHARACTER BY ID
app.get('/characters/:id', function (req, res, next) {
    var id = req.params.id;
    const query = Character.findOne({ "id": id });
    query.select("-_id -__v");
    // execute the query at a later time
    query.exec(function (err, character) {
        if (err) return handleError(err);
        console.log(character)
        res.send(character);
    });
});
// POST NEW CHARACTER
app.post('/characters', function (req, res, next) {
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    } else {
        res.status(200).json({
            status: 'succes',
            data: req.body,
        });

        var character = {
            "name": req.body.name,
            "age": req.body.age,
            "first_element": { "name": req.body.first_element },
            "second_element": { "name": req.body.second_element }
        }
        Character.watch()
        Character.create(character, function (err, res) {

            if (err) return handleError(err);
        });


    }
});

// UPDATE CHARACTER BY ID
app.put('/characters/:id', function (req, res, next) {
    if (!req.body) {
        return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
        });
    } else {
        res.status(200).json({
            status: 'succes',
            data: req.body,
        });
        var id = req.params.id;
        const query = Character.findOneAndUpdate({ "id": id }, { "name": req.body.name });
        query.exec();
    }
})

// DELETE CHARACTER BY ID
app.delete('/characters/:id', function (req, res, next) {
    var id = req.params.id;
    const query = Character.findOneAndDelete({ "id": id });
    query.select("-_id -__v");
    // execute the query at a later time
    query.exec(function (err, character) {
        if (err) return handleError(err);
        console.log(character)
        res.send(character);
    });
});

// GET ALL ELEMENTS
app.get('/elements', function (req, res, next) {
    const query = Element.find();
    query.sort("_id")
    query.select("-_id");
    // execute the query at a later time
    query.exec(function (err, elements) {
        if (err) return handleError(err);
        res.send(elements);
    });
});

app.listen(process.env.PORT || port);
