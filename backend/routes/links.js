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

// ROUTE 3: Update an existing Link using: PUT "/api/links/updatelink/:id".Login required
router.put('/updatelink/:id', fetchuser, [
    body('description', 'Description cannot be blank').exists(),
    body('link', 'Link cannot be blank').trim().exists(),
    body('linkType', 'Link Type cannot be blank').exists(),
], async (req, res) => {

    try {
        const { description, link, linkType, removeDate } = req.body;

        // Create a newNote object
        const newNote = {};
        if (description) { newNote.description = description };
        if (link) { newNote.link = link };
        if (linkType) { newNote.linkType = linkType };
        if (removeDate) { newNote.removeDate = removeDate };

        // Find the Link to be updated and update it
        let linkData = await Links.findById(req.params.id);
        if (!linkData) { return res.status(404).send("Not Found") }

        if (linkData.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        linkData = await Links.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ linkData })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }


})

// ROUTE 3: Delete Link using: DELETE "/api/links/deletelink/:id".Login required
router.delete('/deletelink/:id', fetchuser, async (req, res) => {

    try {
        const { description, link, linkType, removeDate } = req.body;

        // Find the Link to be updated and update it
        let linkData = await Links.findById(req.params.id);
        if (!linkData) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this link
        if (linkData.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        linkData = await Links.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note hab been deleted", linkData: linkData })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Update animation: PUT "/api/links/animation".Login required
router.put('/animation', fetchuser, async (req, res) => {
    try {
        const { _id, animation } = req.body
        console.log(req.body);
        let link = await Links.findById(_id)
        if (animation != "") {
            link.animation = animation
            await link.save()
        } else {
            link.animation = "none"
            await link.save()
        }

        const links = await Links.find({})
        res.json({ success: true, links: links });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})


// ROUTE 5: Update thumbnail: PUT "/api/links/thumbnail".Login required
router.put('/thumbnail', async (req, res) => {
    try {
        const { _id, thumbnail } = req.body
        let link = await Links.findById(_id)
        link.thumbnail = thumbnail
        const links = await link.save()

        res.json({ success: true, links: links });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

// ROUTE 6: Get All the Links of perticular ID using: GET "/api/settings/loadlinks".Login required
router.get('/loadlinks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const links = await Links.find({ user: id })
        res.json(links)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router