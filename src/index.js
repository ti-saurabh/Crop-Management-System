const express=require('express')
const bodyParser = require('body-parser')
const mongoose  = require('mongoose')
const route = require("./Route/route")
const app = express()



app.use(bodyParser.json())
mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://Saurabh2501:SAURABHtiwari2501@cluster0.kpegtjk.mongodb.net/Assign-2", {
       useNewUrlParser: true
    })
    .then( () => console.log("MongoDb is connected"))
    .catch ( err => console.log(err) )

    app.use('/', route)
 

app.listen(3000, () => {
  console.log("Running on port 3000.")
})