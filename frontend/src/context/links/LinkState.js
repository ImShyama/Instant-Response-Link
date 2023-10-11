import linkContext from "./linkContext";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const LinkState = (props) => {
    const host = "http://localhost:5000";
    const publicUrl = "http://localhost:3000";
    const linksInitial = []
    const [links, setLinks] = useState(linksInitial);
    const [clicks, setClicks] = useState([]);
    const [settings, setSettings] = useState([]);
    const [viewlinks, setViewlinks] = useState([]);
    const [viewsetting, setViewsetting] = useState(null);
    const navigate = useNavigate();
    const previewUrl = `${publicUrl}/view/${settings.user}`
    console.log(previewUrl);

    // Get all Links
    const getLinks = async () => {
        // API Call
        const response = await fetch(`${host}/api/links/fetchlinks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setLinks(json)
    }

    // Add a Links
    const addLink = async (linkData) => {
        // API Call
        const { description, link, linkType } = linkData
        const response = await fetch(`${host}/api/links/addlink`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ description, link, linkType })
        });
        const linkData1 = await response.json();
        setLinks(links.concat(linkData1))
        // console.log(json)

        // const linkData1 = {
        //     // "_id": "64f065e7553564d90354fcea",
        //     "user": "64ec4ca659b8dce648e58c93",
        //     "description": description,
        //     "link": link,
        //     "linkType": linkType,
        //     "date": "2023-08-31T10:05:27.581Z",
        //     "__v": 0
        // }
        // console.log(linkData1)

    }

    // Delete a Link
    const deleteLink = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/links/deletelink/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json)
        console.log("Deleting a link", id);
        const newLink = links.filter((link) => link._id !== id)
        setLinks(newLink)
    }

    // Edit a Link
    const editLink = async (id, description, link, linkType) => {
        // API Call
        const response = await fetch(`${host}/api/links/updatelink/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ description, link, linkType })
        });
        const json = await response.json();
        console.log(json);

        let newLinks = JSON.parse(JSON.stringify(links))
        // Logic to edit in client
        for (let index = 0; index < newLinks.length; index++) {
            const element = newLinks[index];
            if (element._id === id) {
                newLinks[index].description = description;
                newLinks[index].link = link;
                newLinks[index].linkType = linkType;
                break;
            }
        }
        setLinks(newLinks);
    }

    const addAnimation = async (e, id) => {
        console.log(e.target.value, id);
        const value = e.target.value;
        const animationId = id;

        // API Call
        const response = await fetch(`${host}/api/links/animation`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ _id: animationId, animation: value })
        });
        const json = await response.json();
        console.log(json);
        // setLinks(json)
    }

    const onChangethumbnail = async (id, thumbnail) => {

        // API Call
        const response = await fetch(`${host}/api/links/thumbnail`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ _id: id, thumbnail: thumbnail })
        });
        const json = await response.json();
        console.log(json);
        // setLinks(json)
    }


    // Authantication context
    // Signup
    const handleSubmit = async (e, credentials, props) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (password !== cpassword) {
            props.showAlert("Invalid Credentials, Password doestn't match with Confirm Password", "danger");
            return;
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            addSettings()
            navigate('/');
            props.showAlert("Account Created Successfully", "success");
        } else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }


    // Settings context
    // Add Settings
    const addSettings = async () => {
        const logo = "", header = "", description = "", backgroundImage = "", background = "", socialLinks = []
        const response = await fetch(`${host}/api/settings/addsettings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ logo, header, description, backgroundImage, background, socialLinks })
        });
        const json = await response.json()
        console.log(json);
    }

    // Get all Settings
    const getSettings = async () => {
        // API Call
        const response = await fetch(`${host}/api/settings/fetchsettings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setSettings(json[0]);
    }

    // Update logo
    const updateLogo = async (logo) => {
        // API Call
        console.log("logo", logo);
        console.log("updatelogo")
        // e.preventDefault();

        const response = await fetch(`${host}/api/settings/updatelogo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ logo: logo })
        });
        const json = await response.json()
        setSettings(json);
    }


    // Update Background Image
    const updateBgImage = async (image) => {
        // API Call
        const response = await fetch(`${host}/api/settings/updatebgimage`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ backgroundImage: image })
        });
        const json = await response.json()
        setSettings(json);
    }

    // Update Background in Linear Gradiant
    const updateLgBackground = async (bg) => {
        // API Call
        const response = await fetch(`${host}/api/settings/updatelgbackground`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ background: bg })
        });
        const json = await response.json()
        setSettings(json);
    }


    // Update Social Link
    const updateSocialLinks = async (link) => {
        // API Call
        const response = await fetch(`${host}/api/settings/updatesociallink`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ socialLinks: link })
        });
        const json = await response.json()
        setSettings(json);
    }

    // Update Left Footer
    const updateleftfooter = async (link) => {
        // API Call
        const response = await fetch(`${host}/api/settings/leftfooter`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ leftFooter: link })
        });
        const json = await response.json()
        setSettings(json);
    }

    // Update Right Footer
    const updaterightfooter = async (link) => {
        // API Call
        const response = await fetch(`${host}/api/settings/rightfooter`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ rightFooter: link })
        });
        const json = await response.json()
        setSettings(json);
    }

    // Update Header
    const addHeader = async (header) => {
        // API Call
        const response = await fetch(`${host}/api/settings/updateheader`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ header: header })
        });
        const json = await response.json()
        setSettings(json);
    }

    // Update Description
    const addDescription = async (description) => {
        // API Call
        const response = await fetch(`${host}/api/settings/updatedescription`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ description: description })
        });
        const json = await response.json()
        setSettings(json);
    }

    // Load Settings
    const loadSettings = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/settings/loadsetting/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        setViewsetting(json);
    }

    // Load Links
    const loadLinks = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/links/loadlinks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        setViewlinks(json);
    }

    // set footer ture false
    const handleFooter = async () => {
        const response = await fetch(`${host}/api/settings/handlefooter`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setSettings(json);
    }

    // set footer ture false
    const handleSearch = async () => {
        const response = await fetch(`${host}/api/settings/handlesearch`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setSettings(json);
    }

    const addClickInfo = async (data) => {
        const response = await fetch(`${host}/api/links/addClicks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json()
        // setLinks(json);
    }

    const fetchclicks = async () => {
        // API Call
        const response = await fetch(`${host}/api/links/fetchclicks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json()
        setClicks(json)
    }


    return (
        <linkContext.Provider
            value={{
                links, settings, previewUrl, viewlinks, viewsetting,clicks, fetchclicks, getLinks, addLink, deleteLink, editLink, addAnimation, onChangethumbnail,
                handleSubmit, getSettings, updateLogo, updateBgImage, updateLgBackground, updateSocialLinks,
                addHeader, addDescription, loadLinks, loadSettings, updaterightfooter, updateleftfooter, handleFooter, handleSearch, addClickInfo
            }}>
            {props.children}
        </linkContext.Provider>
    )
}

export default LinkState;