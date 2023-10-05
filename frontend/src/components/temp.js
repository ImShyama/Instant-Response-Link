import React from 'react'

const temp = () => {
  return (
    <div>
      <div className="container card my-3" style={{ borderRadius: '25px' }}>
        <div className="card-body d-flex justify-content-evenly p-2">
          <div className='' style={{
            height: "80px",
            width: "80px",
            // border: "1px solid black"
          }}>
            {settings.logo && <img src={logoUrl} alt="Logo Image" style={{ height: "80px", width: "80px", objectFit: "contain" }} />}
          </div>
          <div className='d-flex justify-content-start align-items-center'>
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

      <div className="container card my-3" style={{ borderRadius: '25px' }}>

        <div className="card-body d-flex justify-content-evenly p-2">

          <div className='mx-3 ' style={{
            height: "80px",
            width: "120px",
            // border: "1px solid black"
          }}>
            {settings.backgroundImage && <img src={imageUrl} alt="Background Image" style={{ height: "80px", width: "120px", objectFit: "contain" }} />}
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
          {/* <div className="modal fade" id="backgroundModel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          </div> */}
        </div>
      </div>

      <div className="container card my-3" style={{ borderRadius: '25px' }}>
        <div className="card-body d-flex justify-content-around p-2">
          <div className=''>
            <div className="horizontal-gradient" style={{ width: '120px', height: '80px', background: `${settings.background && lgBackground(settings.background)}` }}></div>
          </div>
          <div className='my-auto'>
            <select className="form-select" aria-label="" value={settings.background && lgvBackground(settings.background)} onChange={handleBackground}>
              <option selected>Select Background</option>
              {bgList.map((list) => (
                <option value={list[1]}>{list[0]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

    </div>
  )
}

export default temp
