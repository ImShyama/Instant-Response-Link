const express = require('express')
const router = express.Router()
const Admins = require('../models/Admins');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'CeoitboxisaGood$'

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". Doesn't require Auth
router.post('/login', [
    body('email', 'Enter a valid email').trim().isEmail(),
    body('password', 'Password cannot be blank').trim().exists()
], async (req, res) => {
    console.log(req.body);
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    console.log(req.body);
    const { email, password } = req.body;
    try {
        let user = await Admins.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "Please try to login with corrent credentials" })
        }

        // const passwordCompare = await bcrypt.compare(password, user.password);
        // if (!passwordCompare) {
        //     return res.status(400).json({success, error: "Please try to login with corrent credentials" })
        // }

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

module.exports = router