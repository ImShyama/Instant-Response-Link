const express = require('express')
var cors = require('cors');
const app = express()
require('./db');
const cloudinary = require('cloudinary');
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/api/settings', require('./routes/settings'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

cloudinary.config({ 
    cloud_name: 'dvhzvz2zu', 
    api_key: '264324286185389', 
    api_secret: 'EEfa5VtVifITao_mjb9v4_QLnuo' 
  });