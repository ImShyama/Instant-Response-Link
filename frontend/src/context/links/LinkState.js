import linkContext from "./linkContext";
import React, { useState } from "react";

const LinkState = (props) => {
    const host = "http://localhost:5000";
    const linksInitial = []
    const [links, setLinks] = useState(linksInitial);

    // Get all Links
    const getLinks = async () => {
        // API Call
        const response = await fetch(`${host}/api/links/fetchlinks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYzRjYTY1OWI4ZGNlNjQ4ZTU4YzkzIn0sImlhdCI6MTY5MzIyMTUwNn0.Hbwcvg5kwnHMhgHDCpDkUI3rXcmk_nlvf2heKRbhfRM'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYzRjYTY1OWI4ZGNlNjQ4ZTU4YzkzIn0sImlhdCI6MTY5MzIyMTUwNn0.Hbwcvg5kwnHMhgHDCpDkUI3rXcmk_nlvf2heKRbhfRM'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYzRjYTY1OWI4ZGNlNjQ4ZTU4YzkzIn0sImlhdCI6MTY5MzIyMTUwNn0.Hbwcvg5kwnHMhgHDCpDkUI3rXcmk_nlvf2heKRbhfRM'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlYzRjYTY1OWI4ZGNlNjQ4ZTU4YzkzIn0sImlhdCI6MTY5MzIyMTUwNn0.Hbwcvg5kwnHMhgHDCpDkUI3rXcmk_nlvf2heKRbhfRM'
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

    return (
        <linkContext.Provider value={{ links,getLinks, addLink, deleteLink, editLink }}>
            {props.children}
        </linkContext.Provider>
    )
}

export default LinkState;