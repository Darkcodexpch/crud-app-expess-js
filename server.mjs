import express, { response } from 'express'
import mongoose from 'mongoose'
import cors from "cors"
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json()) //use for parse data in json format
app.use(cors());

// mongodb connect
let dbURI = 'mongodb+srv://dark:dark@cluster0.odg9f.mongodb.net/crud?retryWrites=true&w=majority';
mongoose.connect(dbURI);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

const CrudSchema = new mongoose.Schema({
    "text": String,
    "CreatedOn": { type: Date, default: Date.now }
})

const Crud = mongoose.model('Crud', CrudSchema);

app.get('/', (req, res) => {
    res.send('hello this is express js server and kamran here!')
})


// Post data to server api

app.post('/add', (req, res) => {
    if (!req.body.text || req.body.text > 200) {
        res.status(400).send(`text reuire in json body`)

    }

    let newCrud = new Crud({
        text:req.body.text
    })

    newCrud.save((err,saved)=>{
        if(!err){
            res.send(`Your Response is saved ✔`)
        }
        else{
            res.status(500).send("Sahi sy try kr bsdk")
        }
    })
})



app.listen(PORT, () => {
})
console.log(`app listening at ${PORT}`)