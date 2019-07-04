require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT|| 3000;
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const errorHandler = require('./helpers/errorHandler.js');

let localConnection = process.env.ATLAS_CONNECTION//'mongodb://localhost/hacktivOverflow'
mongoose.connect(localConnection, {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use("/", routes);
app.use(errorHandler)


app.listen(PORT, ()=> {
    console.log(`connected to localhost ${PORT}`);
});