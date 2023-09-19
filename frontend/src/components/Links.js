import React, { useContext, useEffect, useRef, useState } from 'react'
import linkContext from '../context/links/linkContext';
import Linkitem from './Linkitem';
import Addlink from './Addlink';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const Links = () => {
    const context = useContext(linkContext);
    const { links, getLinks, editLink } = context;
    let finalLinkData = links.toReversed(); 
    console.log(finalLinkData);

    const [linkData, updateLinkData] = useState(finalLinkData);

    useEffect(() => {
        getLinks()
        links?.length>0 && updateLinkData(links)
        console.log("linkdata1",links)
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [link, setLink] = useState({ id: "", edescription: "", elink: "", elinkType: "" });

    const updateLink = (currentLink) => {
        ref.current.click()
        setLink({ id: currentLink._id, edescription: currentLink.description, elink: currentLink.link, elinkType: currentLink.linkType });
    }

    const handleClick = (e) => {
        editLink(link.id, link.edescription, link.elink, link.elinkType);
        refClose.current.click()
        // addLink(link);
    }

    const onChange = (e) => {
        setLink({ ...link, [e.target.name]: e.target.value })
    }

    const handleOnDragEnd = (result) => {
        // TODO: reorder our column
        console.log(result);
        console.log("linkdata",linkData);
        // if (!result.destination) return;

        const items = Array.from(linkData);
        console.log(items);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items);
        updateLinkData(items);
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
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={link.edescription} aria-describedby="emailHelp" onChange={onChange} placeholder='Enter Description' />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="elink" name='elink' value={link.elink} onChange={onChange} placeholder='Enter Link' />
                                </div>
                                <div className="mb-3">
                                    <select className="form-select" id='elinkType' name='elinkType' value={link.elinkType} aria-label="Default select example" onChange={onChange} placeholder='Select'>
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
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                disabled={link.edescription.length === 0 || link.elink.length === 0 || link.elinkType.length === 0}
                                type="button" className="btn btn-primary" onClick={handleClick}>Update Link</button>
                        </div>
                    </div>
                </div>
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="d-flex justify-content-center">
                    <h2>List of Links</h2>
                </div>

                <Droppable droppableId="links">
                    {(provided) => (
                        <div className='links'
                            {...provided.droppableProps} ref={provided.innerRef}
                        >
                            {finalLinkData.map((link, index) => {
                                // console.log(link)
                                return (
                                    <Draggable key={link._id} draggableId={link._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Linkitem key={link._id} updateLink={updateLink} link={link} index={index} />
                                                {provided.placeholder}
                                            </div>
                                        )}                   
                                    </Draggable>
                                )

                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default Links
