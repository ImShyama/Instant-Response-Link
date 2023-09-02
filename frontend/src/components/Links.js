import React, { useContext, useEffect, useRef, useState } from 'react'
import linkContext from '../context/links/linkContext';
import Linkitem from './Linkitem';
import Addlink from './Addlink';

const Links = () => {
    const context = useContext(linkContext);
    const { links, getLinks, addLink } = context;
    useEffect(() => {
        getLinks()
    }, [])
    const updateLink = (currentLink) => {
        ref.current.click()
        setLink(currentLink);
    }
    const ref = useRef(null)
    const [link, setLink] = useState({ description: "", link: "", linkType: "" });
    const handleClick = (e) => {
        console.log("updateing the link")
        e.preventDefault();
        // addLink(link);
    }

    const onChange = (e) => {
        setLink({ ...links, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <Addlink />

            {/* Button trigger modal  */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Link</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={link.description} aria-describedby="emailHelp" onChange={onChange} placeholder='Enter Description' />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="elink" name='elink' value={link.link} onChange={onChange} placeholder='Enter Link' />
                                </div>
                                <div className="mb-3">
                                    <select className="form-select" id='elinkType' name='elinkType' value={link.linkType} aria-label="Default select example" onChange={onChange} placeholder='Select'>
                                        {/* <option value="Normal Link" selected disabled>Select Link Type</option> */}
                                        <option value="Normal Link">Normal Link</option>
                                        <option value="Normal Image Link">Normal Image Link</option>
                                        <option value="Drive Image Link">Drive Image Link</option>
                                        <option value="Drive Video">Drive Video</option>
                                        <option value="Youtube Video">Youtube Video</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Link</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <h2>List of Links</h2>
            </div>

            {links.map((link) => {
                return <Linkitem key={link._id} updateLink={updateLink} link={link} />
            })}
        </div>
    )
}

export default Links
