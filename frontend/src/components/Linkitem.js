import {React, useContext} from 'react'
import linkContext from '../context/links/linkContext';

const Linkitem = (props) => {
    const context = useContext(linkContext);
    const { deleteLink } = context;
    const { link, updateLink } = props

    return (
        <div>
            <div className="card my-3" style={{borderRadius:'25px'}}>
                <div className="card-body">
                    <h5 className="card-title">{link.description}</h5>
                    <p className="card-text">{link.link}</p>
                    <div className='d-flex justify-content-between'>
                        <div></div>
                        <div>
                            <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteLink(link._id)}}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateLink(link)}}></i>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Linkitem
