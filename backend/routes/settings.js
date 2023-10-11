const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Settings = require('../models/Settings');
const cloudinary = require('cloudinary');


// ROUTE 1: Add a settings using: POST "/api/settings/addsettings".Login required
router.post('/addsettings', fetchuser, async (req, res) => {
    try {
        const { logo, header, description, backgroundImage, background, socialLinks } = req.body;

        const settingData = new Settings({
            logo: logo, header: header, description: description, backgroundImage: backgroundImage, background: background, socialLinks: socialLinks, user: req.user.id
        })
        const savedSetting = await settingData.save()
        res.json(savedSetting)

        // res.json({ "Success": "AddedcSucess",})
    } catch (e) {
        res.status(500).json({ "error": 'Internal Server Error' });
    }
})

// ROUTE 2: Get All the Settings using: GET "/api/settings/fetchsettings".Login required
router.get('/fetchsettings', fetchuser, async (req, res) => {
    try {
        const settings = await Settings.find({ user: req.user.id })
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 3: Update logo Settings using: PUT "/api/settings/updatelogo".Login required
router.put('/updatelogo', fetchuser, async (req, res) => {
    try {
        const { logo } = req.body;
        const settings = await Settings.find({ user: req.user.id })
        settings[0].logo = logo;
        const savedSetting = await settings[0].save()
        res.json(savedSetting)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 4: Update background image Settings using: PUT "/api/settings/updatebgimage".Login required
router.put('/updatebgimage', fetchuser, async (req, res) => {
    try {
        const { backgroundImage } = req.body;
        const settings = await Settings.find({ user: req.user.id })
        settings[0].backgroundImage = backgroundImage;
        const savedSetting = await settings[0].save()
        res.json(savedSetting)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 5: Update linear gradiant background Settings using: PUT "/api/settings/updatelgbackground".Login required
router.put('/updatelgbackground', fetchuser, async (req, res) => {
    try {
        const { background } = req.body;
        const settings = await Settings.find({ user: req.user.id })
        settings[0].background = background;
        const savedSetting = await settings[0].save()
        res.json(savedSetting)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 6: Update linear gradiant background Settings using: PUT "/api/settings/updatesociallink".Login required
router.put('/updatesociallink', fetchuser, async (req, res) => {
    try {
        console.log("body",req.body);
        const { socialLinks } = req.body;
        // const settings = await Settings.find({ user: req.user.id })
        const settings = await Settings.findOneAndUpdate({ user: req.user.id }, {
            socialLinks: socialLinks
        });
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 7: Update header Settings using: PUT "/api/settings/updateheader".Login required
router.put('/updateheader', fetchuser, async (req, res) => {
    try {
        const { header } = req.body;
        const settings = await Settings.find({ user: req.user.id })
        settings[0].header = header;
        const savedSetting = await settings[0].save()
        res.json(savedSetting)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE 8: Update description Settings using: PUT "/api/settings/updatedescription".Login required
router.put('/updatedescription', fetchuser, async (req, res) => {
    try {
        const { description } = req.body;
        const settings = await Settings.find({ user: req.user.id })
        settings[0].description = description;
        const savedSetting = await settings[0].save()
        res.json(savedSetting)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 9: Get All the Settings of perticular ID using: GET "/api/settings/loadsetting".Login required
router.get('/loadsetting/:id', async (req, res) => {
    try {
        const id = req.params.id
        const settings = await Settings.findOne({ user: id })
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 10: Update Left Footer Settings using: PUT "/api/settings/leftfooter".Login required
router.put('/leftfooter', fetchuser, async (req, res) => {
    try {
        const { leftFooter } = req.body;
        const settings = await Settings.findOneAndUpdate({ user: req.user.id }, {
            leftFooter: leftFooter
        });
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 10: Update Right Footer Settings using: PUT "/api/settings/rightfooter".Login required
router.put('/rightfooter', fetchuser, async (req, res) => {
    try {
        const { rightFooter } = req.body;
        const settings = await Settings.findOneAndUpdate({ user: req.user.id }, {
            rightFooter: rightFooter
        });
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 11: Update handle footer (set true or false) Settings using: PUT "/api/settings/handlefooter".Login required
router.put('/handlefooter', fetchuser, async (req, res) => {
    try {
        const settings = await Settings.findOne({ user: req.user.id })
        if(settings.footer){
            settings.footer = false
            await settings.save()
        }else{
            settings.footer = true
            await settings.save()
        }
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 12: Update handle search (set true or false) Settings using: PUT "/api/settings/handlesearch".Login required
router.put('/handlesearch', fetchuser, async (req, res) => {
    try {
        const settings = await Settings.findOne({ user: req.user.id })
        if(settings.search){
            settings.search = false
            await settings.save()
        }else{
            settings.search = true
            await settings.save()
        }
        res.json(settings)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})


// // ROUTE 1: Update an existing Link using: PUT "/api/settings/updatelink/:id".Login required
// router.put('/updatesettings/:id', fetchuser, async (req, res) => {

//     try {
//         const id = req.params.id;

//         let setting = await Settings.findById(id);
//         if (setting) {
//             const { logo, background, socialLinks } = req.body;

//             if (logo) {
//                 const logobackend = await cloudinary.v2.uploader.upload(logo, { folder: 'logo' })
//                 const logoUrl = logobackend.secure_url;
//                 const publicId = logobackend.public_id;
//                 setting.logo = { public_id: publicId, url: logoUrl }
//             }

//             if (background) {
//                 setting.background = background;
//             }

//             if (socialLinks) {
//                 setting.socialLinks = socialLinks;
//             }

//         }
//         await setting.save();
//         res.json({ "Success": "Updated Sucessfully", setting: setting })
//         // res.status(201).send("Updated Sucessfully")

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error")
//     }
// })


// // ROUTE 1: Get All the Links using: GET "/api/settings/fetchsociallinks".Login required
// router.get('/fetchsociallinks', fetchuser, async (req, res) => {
//     try {
//         const slinks = await Settings.find({ user: req.user.id })
//         res.json(slinks)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error")
//     }
// })

// // ROUTE 5: Add Social links: PUT "/api/settings/addSocialLink".Login required
// router.post('/addSocialLink', fetchuser, async (req, res) => {
//     try {
//         const { _id, linkType, linkUrl } = req.body
//         console.log(req.body);
//         const socialLinks = [linkType, linkUrl];
//         const settingData = new Settings({
//             socialLinks, user: req.user.id
//         })
//         const savedSetting = await settingData.save()
//         res.json(savedSetting)

//     } catch (error) {
//         res.status(500).json({ error, message: 'Internal server error' });
//     }
// })


// ROUTE 5: Update Social links: PUT "/api/settings/updateSocialLink".Login required
// router.put('/updatesociallink', fetchuser, async (req, res) => {
//     try {
//         const { _id, linkType, linkUrl } = req.body
//         console.log(req.body);
//         const settings = await Settings.find({ user: _id })
//         console.log(settings);
//         console.log(settings[0].socialLinks)
//         const socialLinks = [linkType, linkUrl];
//         settings.socialLinks = settings.socialLinks.push(socialLinks);

//         const savedSetting = await settings.save()
//         res.json(savedSetting)

//     } catch (error) {
//         res.status(500).json({ error, message: 'Internal server error' });
//     }
// })







module.exports = router