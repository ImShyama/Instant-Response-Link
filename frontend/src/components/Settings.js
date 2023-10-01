import { React, useState, useEffect, useContext } from 'react'
import AddSocialLink from './AddSocialLink';
import linkContext from '../context/links/linkContext';

const Settings = () => {
  const context = useContext(linkContext);
  let { settings, getSettings } = context;
  // settings = settings[0];
  // const uploadedImage = React.useRef(null);
  // const imageUploader = React.useRef(null);
  const [backGround, setBackGround] = useState('linear-gradient(to right, #56ab2f , #a8e063)')
  console.log("Settings", settings);
  // const handleImageUpload = e => {
  //   const [file] = e.target.files;
  //   console.log(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     const { current } = uploadedImage;
  //     current.file = file;
  //     reader.onload = e => {
  //       current.src = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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
    bg = bg.split(' → ');
    setBackGround(`linear-gradient(to right, ${bg[0]} , ${bg[1]})`)
  };


  useEffect(() => {
    // if (localStorage.getItem('token')) {
    getSettings()
    // }else{
    //     navigate('/login')
    // }
    // eslint-disable-next-line
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
        <h3>Settings</h3>
      </div>
      {/* <div className='logo'>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={imageUploader}
            style={{
              display: "none"
            }}
          />
          <div
            style={{
              height: "100px",
              width: "100px",
              border: "1px dashed black"
            }}
            onClick={() => imageUploader.current.click()}
          >
            <img
              ref={uploadedImage}
              style={{
                width: "100%",
                height: "100%",
                position: "acsolute"
              }}
            />
          </div>
        </div>
      </div> */}
      <div className="d-flex justify-content-center my-3">
        <div className='mx-3' style={{
          height: "100px",
          width: "100px",
          border: "1px dashed black"
        }}>
          {settings.logo !== "" ? <img src={settings.logo} alt="Logo Image" /> : ""}
        </div>
        <div className='d-flex align-items-center'>
          <div className='mx-2' style={{
            height: "50px",
            width: "50px",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"

          }}>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-none shadow-none" data-bs-toggle="modal" data-bs-target="#uploadImageModel">
              <i className="fa-solid fa-upload"></i>
            </button>

          </div>
          Upload Logo
        </div>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="uploadImageModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <input type="text" class="form-control" id="logoInput1" placeholder="Google Drive URL of logo" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center my-3'>
        <div className="input-group " style={{ width: "300px" }}>
          <input type="text" className="form-control" placeholder="Add Header" aria-label="Add Header" aria-describedby="button-addon2" disabled={settings.header !== "" ? true : false} />
          {settings.header === "" ?
            <button className="btn btn-primary" type="button" id="button-addon2" disabled={settings.header === "" ? true : false}>Add</button> :
            <button className="btn btn-primary" type="button" id="button-addon2" disabled={settings.header === "" ? true : false}>Edit</button>
          }
        </div>
      </div>

      <div className='d-flex justify-content-center my-3'>
        <div className="input-group " style={{ width: "500px" }}>
          <textarea type="text" className="form-control" placeholder="Add Description" aria-label="Recipient's username" aria-describedby="button-addon2" disabled={settings.description !== "" ? true : false} />
          {settings.description === "" ?
            <button className="btn btn-primary" type="button" id="button-addon2" disabled={settings.description === "" ? true : false}>Add</button> :
            <button className="btn btn-primary" type="button" id="button-addon2" disabled={settings.description === "" ? true : false}>Edit</button>
          }
        </div>
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className='mx-3' style={{
          height: "100px",
          width: "150px",
          border: "1px dashed black"
        }}>
          {settings.backgroundImage !== "" ? <img src={settings.backgroundImage} alt="Background Image" /> : ""}
        </div>
        <div className='d-flex align-items-center'>
          <div className='mx-2' style={{
            height: "50px",
            width: "50px",
            border: "1px solid black",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"

          }}>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-none shadow-none" data-bs-toggle="modal" data-bs-target="#backgroundModel">
              <i className="fa-solid fa-upload"></i>
            </button>

          </div>
          Upload Background Image
        </div>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="backgroundModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <input type="text" class="form-control" id="backgroundInput1" placeholder="Google Drive URL of Background Image" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center my-3'>
        <div className='mx-3'>
          <div className="horizontal-gradient" style={{ width: '150px', height: '100px', background: `${settings.background}`, border: '1px dashed black' }}></div>
        </div>
        <div className='my-auto'>
          <select className="form-select" aria-label="Default select example" onChange={handleBackground}>
            <option selected>Select Background</option>
            {bgList.map((list) => (
              <option value={list[1]}>{list[0]}</option>
            ))}
          </select>
        </div>

      </div>

      <div >
        <AddSocialLink />
      </div>
      <div></div>
    </div>
  )
}

export default Settings
