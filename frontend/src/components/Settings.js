import { React, useState, useEffect, useContext, useRef } from 'react'
import AddSocialLink from './AddSocialLink';
import linkContext from '../context/links/linkContext';
import Preview from './Preview';

const Settings = () => {
  const context = useContext(linkContext);
  let { settings, getLinks, links, previewUrl, getSettings, updateLogo, updateBgImage,
    updateLgBackground, addHeader, addDescription,
    updaterightfooter, updateleftfooter, handleFooter,
    handleSearch, clicks, fetchclicks } = context;

    console.log("clicks",clicks);

  // const [backGround, setBackGround] = useState(null)

  const bgList = [['Roseanna', "#ffafbd → #ffc3a0"],
  ['Purple Love', '#cc2b5e → #753a88'], ['Piglet', '#ee9ca7 → #ffdde1'],
  ['Mauve', '#42275a → #734b6d'], ['50 Shades of Grey', '#bdc3c7 → #2c3e50'],
  ['A Lost Memory', '#de6262 → #ffb88c'], ['Socialive', '#06beb6 → #48b1bf'],
  ['Cherry', '#eb3349 → #f45c43'], ['Pinky', '#dd5e89 → #f7bb97'],
  ['Lush', '#56ab2f → #a8e063'], ['Kashmir', '#614385 → #516395'],
  ['Tranquil', '#eecda3 → #ef629f'], ['Pale Wood', '#eacda3 → #d6ae7b'],
  ['Green Beach', '#02aab0 → #00cdac'], ['Sha La La', '#d66d75 → #e29587'],
  ['Virgin America', '#7b4397 → #dc2430'], ['Bloody Mary', '#ff512f → #dd2476']]

  const handleBackground = (e) => {
    let bg = e.target.value
    updateLgBackground(bg)
  };

  const lgBackground = (bg) => {
    bg = bg.split(' → ');
    return (`linear-gradient(to right, ${bg[0]} , ${bg[1]})`)
  }

  const lgvBackground = (value) => {
    const temp = bgList.filter((row) => {
      return row[1] === value
    })
    return temp[0][0];
  }


  // Logo settings
  const [logo, setlogo] = useState(settings.logo);

  // const info = `1920px:1200px`

  const DriveUrl = (logoUrl) => {
    let link = logoUrl
    if (logoUrl?.indexOf("https://drive.google.com") > -1) {
      var id = logoUrl.match(/[-\w]{25,}/)[0];
      link = 'http://drive.google.com/uc?export=view&id=' + id;
    }
    return link
  }

  const refCloseLogo = useRef(null)
  const onChangeLogo = (e) => {
    const value = e.target.value;
    setlogo(value);
  }

  const handleUpdateLogo = () => {
    refCloseLogo.current.click()
  }


  // Background Image Settings
  const [image, setImage] = useState(settings.backgroundImage);

  const imageUrl = DriveUrl(settings.backgroundImage);
  const refCloseImage = useRef(null)
  const onChangeImage = (e) => {
    const value = e.target.value;
    setImage(value);
  }

  const handleUpdateImage = () => {
    updateBgImage(image)
    refCloseImage.current.click()
  }


  const [header, setHeader] = useState(settings.header)
  const onchangeHeader = (e) => {
    setHeader(e.target.value)
  }
  const handleheader = () => {
    addHeader(header)
  }

  const [description, setDescription] = useState(settings.description)
  const onchangeDescription = (e) => {
    setDescription(e.target.value)
  }
  const handledescription = () => {
    addDescription(description)
  }

  // left footer
  const [leftFooter, setLeftFooter] = useState({ leftFooterName: "", leftFooterURL: "" });
  // const [leftFooter, setLeftFooter] = useState(settings.leftFooter && settings.leftFooter[0]);
  const [leftfooter, setleftfooter] = useState(settings.leftFooter && settings.leftFooter[0])
  const onChangeleft = (e) => {
    setLeftFooter({ ...leftFooter, [e.target.name]: e.target.value })
    setleftfooter({ ...leftfooter, [e.target.name]: e.target.value })
  }
  const handleAddleft = () => {
    updateleftfooter(leftFooter)
  }


  // right footer
  const [rightFooter, setRightFooter] = useState({ rightFooterName: "", rightFooterURL: "" });
  const onChangeright = (e) => {
    setRightFooter({ ...rightFooter, [e.target.name]: e.target.value })
  }
  const handleAddright = () => {
    updaterightfooter(rightFooter)
  }

  useEffect(() => {
    getSettings()
    getLinks()
    fetchclicks()
  }, [])


  return (
    <div className=''>
      <div className=''
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2>Settings</h2>
      </div>

      <div className='d-flex justify-content-center my-3'>
        <div className="input-group " style={{}}>
          {/* <!-- Button trigger modal --> */}
          <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#previewModel" ><i class="fa-solid fa-eye"></i></button>
          <input type="text" className="form-control" aria-label="Add Header" aria-describedby="button-addon2" value={previewUrl} onChange={onchangeHeader} disabled />
          <button className="btn btn-outline-success" type="button" id="button-addon2" onClick={() => { navigator.clipboard.writeText(previewUrl) }} ><i class="fa-regular fa-copy"></i></button>
        </div>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="previewModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Preview</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div> */}
              {(links?.length > 0 && settings.logo) && <Preview viewsetting={settings} viewlinks={links} />}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-evenly">
        <div>
          <div className='' style={{
            height: "80px",
            width: "80px",
            // border: "1px solid black"
          }}>
            {settings.logo && <img src={DriveUrl(settings.logo)} alt="Logo" style={{ height: "80px", width: "80px", objectFit: "contain" }} />}
          </div>
          <div className='d-flex justify-content-start align-items-center'>
            <div className='' style={{
              height: "25px",
              width: "25px",
              border: "1px solid black",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "5px"
            }}>
              {/* <!-- Button trigger modal --> */}
              <button type="button" className="btn btn-none shadow-none" data-bs-toggle="modal" data-bs-target="#uploadImageModel">
                <i className="fa-solid fa-upload"></i>
              </button>
            </div>
            Logo
            {/* <!-- Modal --> */}
            <div className="modal fade" id="uploadImageModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Logo URL</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <input type="text" class="form-control" id="logoInput1" value={logo} onChange={onChangeLogo} placeholder="Google Drive URL of logo" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" ref={refCloseLogo} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdateLogo}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='' style={{
            height: "80px",
            width: "120px",
            // border: "1px solid black"
          }}>
            {settings.backgroundImage && <img src={imageUrl} alt="Background" style={{ height: "80px", width: "120px", objectFit: "contain" }} />}
          </div>
          <div className='d-flex align-items-center'>
            <div className='' style={{
              height: "25px",
              width: "25px",
              border: "1px solid black",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "5px"
            }}>
              {/* <!-- Button trigger modal --> */}
              <button type="button" className="btn btn-none shadow-none" data-bs-toggle="modal" data-bs-target="#backgroundModel">
                <i className="fa-solid fa-upload"></i>
              </button>
            </div>
            Background
            {/* <!-- Modal --> */}
            <div className="modal fade" id="backgroundModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Background Image</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <input type="text" class="form-control" id="backgroundInput1" onChange={onChangeImage} placeholder="Google Drive URL of Background Image" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" ref={refCloseImage} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdateImage}>Save changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className=''>
            <div className="horizontal-gradient" style={{ width: '120px', height: '80px', background: `${settings.background && lgBackground(settings.background)}` }}></div>
          </div>
          <div className='my-auto' style={{ maxWidth: "120px" }}>
            <select className="form-select my-1 p-1" aria-label="" value={settings.background && lgvBackground(settings.background)} onChange={handleBackground}>
              <option selected>Background</option>
              {bgList.map((list) => (
                <option value={list[1]}>{list[0]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center my-3'>
        <div className="input-group " style={{}}>
          <input type="text" className="form-control" placeholder="Add Header" aria-label="Add Header" aria-describedby="button-addon2" value={header} onChange={onchangeHeader} />
          <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleheader} >Add</button>
          {/* {settings.header === "" ?
            <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleheader} >Add</button> :
            <button className="btn btn-primary" type="button" id="button-addon2" >Edit</button>
          } */}
        </div>
      </div>

      <div className='d-flex justify-content-center my-3'>
        <div className="input-group " style={{}}>
          <textarea type="text" rows="2" className="form-control" placeholder="Add Description" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={onchangeDescription} />
          <button className="btn btn-primary" type="button" id="button-addon2" onClick={handledescription} >Add</button>
          {/* {settings.description === "" ?
            <button className="btn btn-primary" type="button" id="button-addon2" >Add</button> :
            <button className="btn btn-primary" type="button" id="button-addon2" >Edit</button>
          } */}
        </div>
      </div>

      <div className='d-flex justify-conten my-3'>
        <div class="form-check form-switch">
          <input
            type="checkbox"
            checked={settings.footer}
            onChange={handleFooter}
            className="form-check-input"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">Footer</label>
        </div>

        <div class="form-check form-switch mx-5">
          <input
            type="checkbox"
            checked={settings.search}
            onChange={handleSearch}
            className="form-check-input"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">Search</label>
        </div>
      </div>

      {settings.footer && <div>
        <div className='d-flex justify-content-center my-3'>
          <div class="input-group">
            <span>
              <input type="text" class="form-control" name='leftFooterName' aria-label="Text input with dropdown button" onChange={onChangeleft} placeholder='Left Footer Name' />
            </span>
            <input type="text" class="form-control" name='leftFooterURL' aria-label="Text input with dropdown button" onChange={onChangeleft} placeholder='Left Footer URL' />
            <button type="button" class="btn btn-primary" onClick={handleAddleft}>ADD</button>
          </div>
        </div>

        <div className='d-flex justify-content-center my-3'>
          <div class="input-group">
            <span>
              <input type="text" class="form-control" name='rightFooterName' aria-label="Text input with dropdown button" onChange={onChangeright} placeholder='Right Footer Name' />
            </span>
            <input type="text" class="form-control" name='rightFooterURL' aria-label="Text input with dropdown button" onChange={onChangeright} placeholder='Right Footer URL' />
            <button type="button" class="btn btn-primary" onClick={handleAddright}>ADD</button>
          </div>
        </div>
      </div>}


      {<AddSocialLink />}
    </div>
  )
}

export default Settings
