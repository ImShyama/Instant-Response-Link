const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ceoitbox:ceoitbox@slm.dlakl.mongodb.net/IRL?retryWrites=true&w=majority"

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection start")).catch((error) => console.log(error.message));