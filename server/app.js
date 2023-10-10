const express = require('express');
const app = express()
const port = 3000
const cors = require('cors');
const router = require('./routes');
const error = require('./middleware/errorHandler');

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use(error)

app.listen(port)