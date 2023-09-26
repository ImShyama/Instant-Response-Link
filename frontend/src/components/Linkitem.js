import { React, useContext } from 'react'
import linkContext from '../context/links/linkContext';
import { Draggable } from 'react-beautiful-dnd';

const Linkitem = (props) => {
    // console.log(props)
    const context = useContext(linkContext);
    const { deleteLink } = context;
    const { index,link,updateLink } = props;
    // console.log(link)

    return (
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
                        <i className="fa-regular fa-image mx-2"></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateLink(link) }}></i>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteLink(link._id); props.showAlert("Deleted Sucessfully","success") }}></i>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Linkitem
