import { React, useRef, useState } from 'react'
import SocialLink from './SocialLink';

const AddSocialLink = () => {

    const [add, setAdd] = useState(false);
    const [links, setLink] = useState({ linkType: "", linkUrl: "" });
    const [sLink, setSLink] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        setSLink(sLink.concat(links));
        // setLink({inkType: "",linkUrl:""})
        setAdd(false);
    }

    const onChange = (e) => {
        setLink({ ...links, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        add ? setAdd(false) : setAdd(true)

    }



    return (
        <div className='' style={{ paddingInline: "100px" }}>
            <div className="d-flex justify-content-center my-2" style={{ backgroundColor: '#bad900', color: '#fff', borderRadius: "20px", cursor: "pointer" }} onClick={handleAdd}>
                <span className='my-2'>{add ? <i className="fa-solid fa-minus"></i> : <i className="fa-regular fa-plus" ></i>} Add Social Link</span>
            </div>

            {
                add ?
                    <form>

                        <div class="input-group mb-3">
                            <span>
                                <select class="form-select w-auto" name='linkType' aria-label="Default select example" onChange={onChange} >
                                    <option value="DEFAULT" disabled selected>Link Type</option>
                                    <option value="Linkedin">Linkedin</option>
                                    <option value="Twitter">Twitter</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Github">Github</option>
                                    <option value="Other">Other</option>
                                </select>
                            </span>

                            <input type="text" class="form-control" name='linkUrl' aria-label="Text input with dropdown button" onChange={onChange} placeholder='Enter Link URL' />
                            <button type="button" class="btn btn-primary" onClick={handleClick}>ADD</button>
                        </div>

                        {/* <div className="mb-3">
                        <label htmlFor="linktype" className="form-label">Link Type</label>
                        <select className="form-select" id='linkType' name='linkType' aria-label="Default select example" onChange={onChange} placeholder='Select'>
                            <option value="DEFAULT" disabled selected>Select Link Type</option>
                            <option value="Normal Link">Normal Link</option>
                            <option value="Normal Image Link">Normal Image Link</option>
                            <option value="Drive Image Link">Drive Image Link</option>
                            <option value="Drive Video">Drive Video</option>
                            <option value="Youtube Video">Youtube Video</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input type="text" className="form-control" id="link" name='link' onChange={onChange} placeholder='Enter Link' />
                    </div>

                    <button disabled={links.description.length === 0 || links.link.length === 0 || links.linkType.length === 0} type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button> */}
                    </form>
                    : ""

            }

            <div className='row'>
                {console.log(sLink.length)}
                {console.log(sLink)}
                {sLink.length > 0 ?
                    sLink.map((socialLink) => {
                        return <SocialLink linktype={socialLink.linkType} linkurl={socialLink.linkUrl} />
                        // return <p>{socialLink.linkType}</p>
                    })
                    :
                    ""
                }
            </div>

        </div>
    )
}

export default AddSocialLink
