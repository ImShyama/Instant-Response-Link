import React, { useContext, useState } from 'react'
import linkContext from '../context/links/linkContext'

const Addlink = () => {
    const context = useContext(linkContext);
    const { addLink } = context;
    const [links, setLink] = useState({ description: "", link: "", linkType: "" });
    const [add, setAdd] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        addLink(links);
        setLink({description: "", link: "", linkType: ""})
        setAdd(false);
    }

    const onChange = (e) => {
        setLink({ ...links, [e.target.name]: e.target.value })
    }
    const handleAdd = () => {
        add ? setAdd(false) : setAdd(true)
    }

    return (
        <div className='my-3'>
            <div className="d-flex justify-content-center my-3" style={{ backgroundColor: '#0D6EFD', color: '#fff', borderRadius: "20px", cursor: "pointer" }} onClick={handleAdd}>
                <span className='my-2'>{add ? <i className="fa-solid fa-minus"></i> : <i className="fa-regular fa-plus" ></i>} Add Link</span>
            </div>

            {
                add ? <form>
                    <div className="mb-3">
                        {/* <label htmlFor="description" className="form-label">Description</label> */}
                        <input type="text" className="form-control" id="description" name='description' aria-describedby="emailHelp" onChange={onChange} placeholder='Enter Description' />
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="link" className="form-label">Link</label> */}
                        <input type="text" className="form-control" id="link" name='link' onChange={onChange} placeholder='Enter Link' />
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="linktype" className="form-label">Link Type</label> */}
                        <select className="form-select" id='linkType' name='linkType' aria-label="Default select example" onChange={onChange} placeholder='Select'>
                            <option value="DEFAULT" disabled selected>Select Link Type</option>
                            <option value="Normal Link">Normal Link</option>
                            <option value="Normal Image Link">Normal Image Link</option>
                            <option value="Drive Image Link">Drive Image Link</option>
                            <option value="Drive Video">Drive Video</option>
                            <option value="Youtube Video">Youtube Video</option>
                        </select>
                    </div>

                    <button disabled={links.description.length === 0 || links.link.length === 0 || links.linkType.length === 0} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
                    : ""

            }

        </div>
    )
}

export default Addlink
