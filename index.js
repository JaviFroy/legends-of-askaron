const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const mongoString = "mongodb+srv://admin:admin@realmcluster.uidt7.mongodb.net/characters?retryWrites=true&w=majority"

mongoose.connect(mongoString, { useNewUrlParser: true })

mongoose.connection.on("error", function (error) {
    console.log(error)
})

mongoose.connection.on("open", function () {
    console.log("Connected to MongoDB database.")
})


const { Schema } = mongoose;
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
});



const Person = mongoose.model('characters', characterSchema);
// GET ALL CHARACTERS
app.get('/characters', function (req, res, next) {
    /*
        fs.readFile('../assets/json/characters.json', (err, jsonString) => {
            if (err) {
                console.log("Error al leer el archivo:", err)
                return
            } try {
                var jsonData = JSON.parse(jsonString);
                res.send(jsonData);
                res.end()
            } catch (err) {
                console.log('Error al analizar la cadena JSON:', err)
            }
        });*/

    // find each person with a last name matching 'Ghost'
    const query = Person.find();
    // selecting the `name age` field
    query.select('id name age image mode first_element second_element');
    // execute the query at a later time
    query.exec(function (err, person) {
        if (err) return handleError(err);
        console.log(person)
        res.send(person);
    });
})
// GET CHARACTER BY ID
app.get('/characters/:id', function (req, res, next) {
    var id = req.params.id;
    fs.readFile('../assets/json/characters.json', (err, jsonString) => {
        if (err) {
            console.log("Error al leer el archivo:", err)
            return
        } try {
            var jsonData = JSON.parse(jsonString);
            var character = getCharacterById(jsonData, id);
            res.send(character);
            res.end()
        } catch (err) {
            console.log('Error al analizar la cadena JSON:', err)
        }
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
        fs.readFile('../assets/json/characters.json', (err, jsonString) => {
            if (err) {
                console.log("Error al leer el archivo:", err)
                return
            } try {
                var jsonData = JSON.parse(jsonString);
                var character =
                {
                    "id": uuidv4(),
                    "name": req.body.name,
                    "age": req.body.age,
                    "first_element": { "name": req.body.first_element },
                    "second_element": { "name": req.body.second_element }
                };
                jsonData.push(character);
                write('../assets/json/characters.json', jsonData)
                res.send(jsonData);
                res.end()
            } catch (err) {
                console.log('Error al analizar la cadena JSON:', err)
            }
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
        fs.readFile('../assets/json/characters.json', (err, jsonString) => {
            if (err) {
                console.log("Error al leer el archivo:", err)
                return
            } try {
                var jsonData = JSON.parse(jsonString);
                console.log(req.body);
                for (let i = 0; i < jsonData.length; i++) {
                    if (jsonData[i].id == req.body.id) {
                        jsonData[i].name = req.body.name;
                    }
                }
                write('../assets/json/characters.json', jsonData);
                res.end()
            } catch (err) {
                console.log('Error al analizar la cadena JSON:', err)
            }
        });
    }
})

// DELETE CHARACTER BY ID
app.delete('/characters/:id', function (req, res, next) {
    fs.readFile('../assets/json/characters.json', (err, jsonString) => {
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: 'req body cannot be empty',
            });
        } try {
            var id = req.params.id;
            var jsonData = JSON.parse(jsonString);
            var index = -1;
            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].id == id) {
                    index = i;
                }
            }
            jsonData.splice(index, 1);
            write('../assets/json/characters.json', jsonData)
            res.send(jsonData)
            res.end()
        } catch (err) {
            console.log('Error al analizar la cadena JSON:', err)
        }
    });
});

function getCharacterById(list, id) {
    return list.find(
        function (list) {
            return list.id == id;
        }
    );
}

function write(file, data) {
    fs.writeFile(file, JSON.stringify(data), err => {
        if (err) {
            console.log('Error al escribir en el archivo \"' + file + '\"', err)
        } else {
            console.log(' Datos del archivo: ', data);
            console.log('Se escribió correctamente en el archivo \"' + file + '\"')
        }
    })
}
/*
var database, collection;
app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("characters");
        console.log("Connected to " + DATABASE_NAME);
    });
});*/

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});