require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT, CONNECTION_STRING} = process.env
const { seed, saveResume, getResume } = require('./controller.js')

console.log(typeof CONNECTION_STRING);
console.log(CONNECTION_STRING);


app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

app.post('/saveResume', saveResume)
app.get('/getResume', getResume);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))