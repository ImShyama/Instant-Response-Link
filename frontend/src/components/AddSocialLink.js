import { React, useRef } from 'react'

const AddSocialLink = () => {

    const refSL = useRef(null)
    const refCloseSL = useRef(null)

    const handleAddSocialLink = () => {
        refSL.current.click()
    }

    const handleClickSL = () => {

    }



    return (
        <div className='d-flex justify-content-center'>
            {/* Button trigger modal  */}
            <button type="button" ref={refSL} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Social Link</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    {/* <input type="text" className="form-control" id="edescription" name='edescription' value={link.edescription} aria-describedby="emailHelp" onChange={onChange} placeholder='Enter Description' /> */}
                                </div>
                                <div className="mb-3">
                                    {/* <input type="text" className="form-control" id="elink" name='elink' value={link.elink} onChange={onChange} placeholder='Enter Link' /> */}
                                </div>
                                <div className="mb-3">
                                    {/* <select className="form-select" id='elinkType' name='elinkType' value={link.elinkType} aria-label="Default select example" onChange={onChange} placeholder='Select'> */}
                                    {/* <option value="Normal Link" selected disabled>Select Link Type</option> */}
                                    {/* <option value="Normal Link">Normal Link</option>
                                        <option value="Normal Image Link">Normal Image Link</option>
                                        <option value="Drive Image Link">Drive Image Link</option>
                                        <option value="Drive Video">Drive Video</option>
                                        <option value="Youtube Video">Youtube Video</option>
                                    </select> */}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refCloseSL} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                // disabled={link.edescription.length === 0 || link.elink.length === 0 || link.elinkType.length === 0}
                                type="button" className="btn btn-primary" onClick={handleClickSL}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center my-3 md-2" style={{ backgroundColor: '#bad900', color: '#fff', borderRadius: "20px", cursor: "pointer", width: '62%' }} onClick={handleAddSocialLink}>
                <span className='my-2'>{<i className="fa-regular fa-plus" ></i>} Add Social Link</span>
            </div>

            <div></div>
        </div>
    )
}

export default AddSocialLink
