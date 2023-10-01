import linkContext from "./linkContext";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const LinkState = (props) => {
    const host = "http://localhost:5000";
    const linksInitial = []
    const [links, setLinks] = useState(linksInitial);
    const [settings, setSettings] = useState([]);
    const navigate = useNavigate();

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
        const {description,link,linkType} = linkData
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
            body: JSON.stringify({description, link, linkType})
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

    const addAnimation = async (e,id) =>{
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
            body: JSON.stringify({_id:animationId, animation:value})
        });
        const json = await response.json();
        console.log(json);
        // setLinks(json)

    }

    const onChangethumbnail = async (id,thumbnail) => {

        // API Call
        const response = await fetch(`${host}/api/links/thumbnail`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({_id:id, thumbnail:thumbnail})
        });
        const json = await response.json();
        console.log(json);
        // setLinks(json)
    }


    // Authantication context
    // Signup
    const handleSubmit = async(e,credentials,props) => {
        e.preventDefault();
        const {name, email, password, cpassword} = credentials;
        if(password !== cpassword){
            props.showAlert("Invalid Credentials, Password doestn't match with Confirm Password", "danger");
            return;
        }
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password})
        });
        const json = await response.json()
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            addSettings()
            navigate('/');
            props.showAlert("Account Created Successfully", "success");
        }else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }


    // Settings context
    // Add Settings
    const addSettings = async() => {
        const logo="", header="", description="",  backgroundImage="", background="", socialLinks=[]
        const response = await fetch(`${host}/api/settings/addsettings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ logo, header, description,  backgroundImage, background, socialLinks })
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


    return (
        <linkContext.Provider value={{ links,settings, getLinks, addLink, deleteLink, editLink, addAnimation, onChangethumbnail, handleSubmit, getSettings }}>
            {props.children}
        </linkContext.Provider>
    )
}

export default LinkState;