import React, { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import linkContext from '../context/links/linkContext';
import Link from './Link'

const View = () => {

  const location = useLocation().pathname.split('/');
  const param = location[location.length - 1]
  const context = useContext(linkContext);
  let { loadLinks, loadSettings, viewsetting, viewlinks } = context;
  console.log(viewlinks)
  console.log(viewsetting)
  useEffect(() => {
    loadLinks(param)
    loadSettings(param)
  }, [])

  const DriveUrl = (logoUrl) => {
    if (logoUrl?.indexOf("https://drive.google.com") > -1) {
      var id = logoUrl.match(/[-\w]{25,}/)[0];
      logoUrl = 'http://drive.google.com/uc?export=view&id=' + id;
    } else {
      logoUrl = logoUrl;
    }
    return logoUrl
  }

  const backgroundStyle = {
    backgroundImage: `url(${viewsetting && DriveUrl(viewsetting.backgroundImage)})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no - repeat',
    backgroundSize: 'cover',
    position: 'relative',
    top: "0"
  }

  return (
    <div className='' style={backgroundStyle} >
      <div className='d-flex justify-content-center'>
        {viewsetting &&
          <div className='m-3' style={{ textAlign: "center" }}>
            <div>
              {viewsetting.logo !=="" && <img src={DriveUrl(viewsetting.logo)} style={{ width: "120px", height: "120px", margin:"10px", padding:"5px" }} />}
            </div>
            <div>
              <h2>{viewsetting.header}</h2>
            </div>
            <div>
              <h6>{viewsetting.description}</h6>
            </div>
          </div>
        }
      </div>
      <div>

        {
          viewlinks.map((link) => (
            <Link link={link} />
          ))
        }
      </div>
    </div>
  )
}

export default View
