require("dotenv").config()
const express = require('express');



const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;



app.listen(SERVER_PORT)