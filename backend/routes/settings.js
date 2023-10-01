const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Settings = require('../models/Settings');
const cloudinary = require('cloudinary');


// ROUTE 1: Add a settings using: POST "/api/settings/addsettings".Login required
router.post('/addsettings', fetchuser, async (req, res) => {
    try {
        const { logo, header, description,  backgroundImage, background, socialLinks } = req.body;

            const settingData = new Settings({
                logo:logo, header:header, description:description,  backgroundImage:backgroundImage, background:background, socialLinks:socialLinks, user: req.user.id
            })
            const savedSetting = await settingData.save()
            res.json(savedSetting)
           
        // res.json({ "Success": "AddedcSucess",})
    } catch (e) {
        res.status(500).json({"error": 'Internal Server Error'});
    }
})

// ROUTE 2: Get All the Settings using: GET "/api/settings/addsettings".Login required
router.get('/fetchsettings', fetchuser, async (req, res) => {
    try {
        const settings = await Settings.find({ user: req.user.id })
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 1: Update an existing Link using: PUT "/api/settings/updatelink/:id".Login required
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


// ROUTE 1: Get All the Links using: GET "/api/settings/fetchsociallinks".Login required
router.get('/fetchsociallinks', fetchuser, async (req, res) => {
    try {
        const slinks = await Settings.find({ user: req.user.id })
        res.json(slinks)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 5: Add Social links: PUT "/api/settings/addSocialLink".Login required
router.post('/addSocialLink', fetchuser, async (req, res) => {
    try {
        const { _id, linkType, linkUrl} = req.body
        console.log(req.body);
        const socialLinks = [linkType,linkUrl];
        const settingData = new Settings({
            socialLinks, user: req.user.id
        })
        const savedSetting = await settingData.save()
        res.json(savedSetting)

    } catch (error) {
        res.status(500).json({error, message: 'Internal server error' });
    }
})


// ROUTE 5: Update Social links: PUT "/api/settings/updateSocialLink".Login required
router.put('/updateSocialLink', fetchuser, async (req, res) => {
    try {
        const { _id, linkType, linkUrl} = req.body
        console.log(req.body);
        const settings = await Settings.find({ user: _id })
        console.log(settings);
        console.log(settings[0].socialLinks)
        const socialLinks = [linkType,linkUrl];
        settings.socialLinks = settings.socialLinks.push(socialLinks);
        
        const savedSetting = await settings.save()
        res.json(savedSetting)

    } catch (error) {
        res.status(500).json({error, message: 'Internal server error' });
    }
})






module.exports = router