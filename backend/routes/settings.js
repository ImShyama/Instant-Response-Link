const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Settings = require('../models/Settings');
const cloudinary = require('cloudinary');


// ROUTE 1: Add a settings using: POST "/api/settings/addsettings".Login required
router.post('/addsettings', fetchuser, async (req, res) => {

    try {
        const { logo, background, socialLinks } = req.body;
        console.log(req.body);
        console.log(background)

            const logobackend = await cloudinary.v2.uploader.upload(logo, { folder: 'logo' })
            const logoUrl = logobackend.secure_url;
            const publicId = logobackend.public_id;

            const settingData = new Settings({
                logo: { public_id: publicId, url: logoUrl },
                background,
                socialLinks
            })
            const savedSetting = await settingData.save()
            res.json(savedSetting)

            // await Settings.create({
            //     logo: { public_id: publicId, url: logoUrl },
            //     background,
            //     socialLinks
            // })
           
        res.json({ "Success": "AddedcSucess",})
        // res.status(201).send("Added Successfully")
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 1: Update an existing Link using: PUT "/api/links/updatelink/:id".Login required
router.put('/updatesettings/:id', fetchuser, async (req, res) => {

    try {
        const id = req.params.id;

        let setting = await Settings.findById(id);
        if (setting) {
            const { logo, background, socialLinks } = req.body;

            if (logo) {
                const logobackend = await cloudinary.v2.uploader.upload(logo, { folder: 'logo' })
                const logoUrl = logobackend.secure_url;
                const publicId = logobackend.public_id;
                setting.logo = { public_id: publicId, url: logoUrl }
            }

            if (background) {
                setting.background = background;
            }

            if (socialLinks) {
                setting.socialLinks = socialLinks;
            }

        }
        await setting.save();
        res.json({ "Success": "Updated Sucessfully", setting: setting })
        // res.status(201).send("Updated Sucessfully")

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 1: Get All the Links using: GET "/api/links/fetchsociallinks".Login required
router.get('/fetchsociallinks', fetchuser, async (req, res) => {
    try {
        const slinks = await Settings.find({ user: req.user.id })
        res.json(slinks)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})






module.exports = router