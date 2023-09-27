const express = require('express')
const router = express.Router()
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'CeoitboxisaGood$'

// ROUTE 1: Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').trim().isEmail(),
    body('password', 'Password must be atlist 5 characters').trim().isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }

})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". Doesn't require Auth
router.post('/login', [
    body('email', 'Enter a valid email').trim().isEmail(),
    body('password', 'Password cannot be blank').trim().exists()
], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Please try to login with corrent credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "Please try to login with corrent credentials" })
        }

        if(!user.approved){
            return res.status(400).json({success, error: "You don't have a right to login, Please contact to our team" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser".Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router


// ROUTE 3: Get All User Details using: POST "/api/auth/getalluser".Login not required
router.get('/getalluser', async (req, res) => {
        try {
            const user = await User.find()
            res.json({ success: true, clients: user.reverse() })
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error")
        }
})
module.exports = router


// ROUTE 3: Update Approved fields using: PUT "/api/auth/approve".Login not required
router.put('/approve', async (req, res) => {
    try {
        const { _id } = req.body
        console.log(_id);
        let client = await User.findById(_id)
        console.log(client);
        if(client.approved){
            client.approved = false
            await client.save()
        }else{
            client.approved = true
            await client.save()
        }        
        

        const clients = await User.find({})
        res.json({ success: true, clients: clients.reverse() });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = router

