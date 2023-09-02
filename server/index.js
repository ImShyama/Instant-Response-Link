const express = require('express')
var cors = require('cors');
const app = express()
require('./db');
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})