import React from 'react'
import './Link.css';

const Link = (props) => {
    const { link } = props

    const DriveUrl = (logoUrl) => {
        if (logoUrl?.indexOf("https://drive.google.com") > -1) {
            var id = logoUrl.match(/[-\w]{25,}/)[0];
            logoUrl = 'http://drive.google.com/uc?export=view&id=' + id;
        } else {
            logoUrl = logoUrl;
        }
        return logoUrl
    }


    return (
        <div className='d-flex justify-content-between p-2' style={{background:"#fff", borderRadius:"50px", width:"55%", margin:"10px auto 0px auto", alignItems: 'center'}}>
            <div style={{width:"40px",height:"40px"}}>
                {link.thumbnail  && <img src={DriveUrl(link.thumbnail)} style={{width:"40px",height:"40px", borderRadius:"100%"}} />}
            </div>
            <div className='m-2'>
                <h6 style={{marginBottom: "0"}}>{link.description}</h6>
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{width:"40px",height:"40px", borderRadius:"100%"}} >
                <span >&#8226;&#8226;&#8226;</span>
            </div>
        </div>
    )


}

export default Link
