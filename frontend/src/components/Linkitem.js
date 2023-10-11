import { React, useContext, useState, useRef, useEffect } from 'react'
import linkContext from '../context/links/linkContext';
import { Draggable } from 'react-beautiful-dnd';
import Table from './Table';

const Linkitem = (props) => {
    // console.log(props)
    const context = useContext(linkContext);
    const { deleteLink, addAnimation, onChangethumbnail, clicks } = context;
    const { index, link, updateLink } = props;
    const refCloseThumbnail = useRef(null);
    const filterClicks = clicks?.filter((click) => { return click.linkID === link._id })
    const [filterClick, setFilterClick] = useState([])
    const showTable = (id) => {
        console.log(id);
        const filterClicks = clicks?.filter((click) => { return click.linkID === link._id })
        console.log(filterClicks);
        setFilterClick(filterClicks)
    }

    const [thumbnail, setThumbnail] = useState("");
    const uploadThumbnail = (id) => {
        console.log(thumbnail);
        onChangethumbnail(id, thumbnail)
        refCloseThumbnail.current.click()
    }

    const onChange = (e) => {
        const value = e.target.value
        setThumbnail(value);
        console.log(e.target.value);
    }


    return (
        <>
            <div className="card my-3" style={{ borderRadius: '25px' }}>
                <div className="card-body">

                    <span className='d-flex justify-content-center'>
                        <img style={{ width: '25px', height: '25px', transform: 'rotate(90deg)' }} src='./draggable-dots.ico' />
                    </span>
                    <div className='d-flex justify-content-between'>
                        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '80%' }}>
                            <h5 className="card-title">{link.description}</h5>
                            <p className="card-text">{link.link}</p>
                        </div>
                        <div className='my-auto'>
                            {/* <img style={{ width: '25px', height: '25px' }} src='./draggable-dots.ico' /> */}
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div></div>
                        <div>
                            <label>
                                <select className="form-select form-select-sm" aria-label=".form-select-sm example" value={link.animation} onChange={(e) => { addAnimation(e, link._id) }}>
                                    <option selected>Animation</option>
                                    <option value="Bouncing">Bouncing</option>
                                    <option value="Expansion">Expansion</option>
                                    <option value="Fade">Fade</option>
                                    <option value="Move sideways">Move sideways</option>
                                    <option value="Colour highlighter">Colour highlighter</option>
                                </select>
                            </label>
                            <label className='m-1 p-1'>
                            {/* <button type="button" className="btn btn-none shadow-none" style={{ paddingTop: "3px" }} id='file' data-bs-toggle="modal" data-bs-target="#thumbnail"> */}
                                <button type="button" onClick={() => showTable(link._id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#clickTable">
                                    <p>{filterClicks?.length}</p>
                                </button>

                            </label>

                            <label>
                                <button type="button" className="btn btn-none shadow-none" style={{ paddingTop: "3px" }} id='file' data-bs-toggle="modal" data-bs-target="#thumbnail">
                                    <i htmlFor="file" className="fa-regular fa-image "></i>
                                </button>
                            </label>
                            {/* <input type='file' id='file' style={{ display: 'none' }} onChange={(e) => onChangethumbnail(e,link._id)} /> */}
                            {/* <label htmlFor="file" data-bs-toggle="modal" data-bs-target="#myModal"><i htmlFor="file" className="fa-regular fa-image mx-2"></i></label> */}
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateLink(link) }}></i>
                            <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteLink(link._id); props.showAlert("Deleted Sucessfully", "success") }}></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Modal for thumbnail upload */}
            <div className="modal" id="thumbnail">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">

                        {/* Modal Header  */}
                        <div className="modal-header">
                            <h4 className="modal-title">Upload Thumbnail</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* Modal body */}
                        <div className="modal-body">
                            Enter thumbnail URL Link
                            <input type="text" className="form-control" id="thumbnailInput" onChange={onChange} />
                        </div>

                        {/* Modal footer  */}
                        <div className="modal-footer">
                            <button type="button" ref={refCloseThumbnail} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button" className="btn btn-primary" onClick={() => uploadThumbnail(link._id)}>Update Link</button>
                        </div>

                    </div>
                </div>
            </div>

            {/* The Modal for clicks table  */}
            <div className="modal" id="clickTable">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        {/* Modal Header  */}
                        <div className="modal-header">
                            <h4 className="modal-title">Clicks Table</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* Modal body */}
                        <div className="modal-body">
                            {/* Enter thumbnail URL Link
                            <input type="text" className="form-control" id="thumbnailInput" onChange={onChange} /> */}
                            <Table data = {filterClick}/>
                        </div>

                        {/* Modal footer  */}
                        {/* <div className="modal-footer">
                            <button type="button" ref={refCloseThumbnail} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button" className="btn btn-primary" onClick={() => uploadThumbnail(link._id)}>Update Link</button>
                        </div> */}

                    </div>
                </div>
            </div>
        </>

    )
}

export default Linkitem
