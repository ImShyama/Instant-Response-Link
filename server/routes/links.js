const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Links = require('../models/Links');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Links using: GET "/api/links/fetchlinks".Login required
router.get('/fetchlinks', fetchuser, async (req, res) => {
    try {
        const links = await Links.find({ user: req.user.id })
        res.json(links)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2: Add a new Links using: POST "/api/links/addlink".Login required
router.post('/addlink', fetchuser, [
    body('description', 'Description cannot be blank').exists(),
    body('link', 'Link cannot be blank').trim().exists(),
    body('linkType', 'Link Type cannot be blank').exists(),
], async (req, res) => {
    try {
        const { description, link, linkType, removeDate } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const linkData = new Links({
            description, link, linkType, removeDate, user: req.user.id
        })
        const savedLink = await linkData.save()
        res.json(savedLink)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router