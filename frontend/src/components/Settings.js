import React, { useState } from 'react'
import AddSocialLink from './AddSocialLink';

const Settings = () => {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [backGround, setBackGround] = useState('linear-gradient(to right, #56ab2f , #a8e063)')

  const handleImageUpload = e => {
    const [file] = e.target.files;
    console.log(file);
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

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
      <div className='logo'>
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
          Click To Upload Logo
        </div>
      </div>
      <div className='d-flex justify-content-evenly my-3'>
        <div className='my-auto'>
          <select className="form-select" aria-label="Default select example" onChange={handleBackground}>
            <option selected>Select Background</option>
            {bgList.map((list) => (
              <option value={list[1]}>{list[0]}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="horizontal-gradient" style={{ width: '120px', height: '120px', background: backGround }}></div>
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
