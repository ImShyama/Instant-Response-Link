import { React, useState, useEffect, useContext, useRef } from "react";
import AddSocialLink from "./AddSocialLink";
import linkContext from "../context/links/linkContext";
import Preview from "./Preview";
import CustomModal from "./Custom/CustomModal";
import ColorPicker from "./ColorPicker/ColorPicker";

const Settings = () => {
  const context = useContext(linkContext);

  let {
    settings,
    getLinks,
    links,
    previewUrl,
    getSettings,
    updateLogo,
    updateBgImage,
    updateLgBackground,
    addHeader,
    addDescription,
    updaterightfooter,
    updateleftfooter,
    handleFooter,
    handleSearch,
    clicks,
    fetchclicks,
    updateHeaderSetting,
    updateDescriptionSetting,
    updatedleftfooterStyle,
    updatedrightfooterStyle,
    updatedpaginationStyle,
    updatedLinksStyle,
  } = context;

  // Header satting
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleClose = () => {
    setEditing(false);
  };
  const [isEditing, setEditing] = useState(false);

  const [editedFontSize, setEditedFontSize] = useState(
    settings.headersSettings?.fontSize || ""
  );
  const [editedFontColor, setEditedFontColor] = useState(
    settings.headersSettings?.fontColor || ""
  );
  const [editedFontFamily, setEditedFontFamily] = useState(
    settings.headersSettings?.fontFamily || ""
  );

  const handleSaveClick = () => {
    updateHeaderSetting(editedFontSize, editedFontColor, editedFontFamily);
    setEditedFontColor("");
    setEditedFontSize("");
    setEditedFontFamily("");
    setEditing(false);
  };

  // Description setting
  const [isEditingDescription, setEditingDescription] = useState(false);
  const handleEditdescription = () => {
    setEditingDescription(true);
  };

  const handleClosedescription = () => {
    setEditingDescription(false);
  };

  const [editDescColor, setEditDescColor] = useState(
    settings.descriptionSettings?.color || ""
  );
  const [editDescSize, setEditDescSize] = useState(
    settings.descriptionSettings?.size || ""
  );
  const [editDescFontFamily, setEditDescFontFamily] = useState(
    settings.descriptionSettings?.family || ""
  );

  const handleSaveDescription = () => {
    updateDescriptionSetting(editDescColor, editDescSize, editDescFontFamily);
    setEditDescColor("");
    setEditDescSize("");
    setEditDescFontFamily("");
    setEditingDescription(false);
  };

  // Left Footer Setting
  const [isEditingLeftFooter, setEditingLeftFooter] = useState(false);

  const handleEditLeftFooter = () => {
    setEditingLeftFooter(true);
  };

  const handleCloseLeftFooter = () => {
    setEditingLeftFooter(false);
  };

  const [editLeftFooterColor, setEditLeftFooterColor] = useState(
    settings.leftFooterSetting?.color || ""
  );
  const [editLeftFooterSize, setEditLeftFooterSize] = useState(
    settings.leftFooterSetting?.size || ""
  );
  const [editLeftFooterFamily, setEditLeftFooterFamily] = useState(
    settings.leftFooterSetting?.family || ""
  );
  const [editLeftFooterBackground, setEditLeftFooterBackground] = useState(
    settings.leftFooterSetting?.background || ""
  );

  const handleSaveLeftFooter = () => {
    updatedleftfooterStyle(
      editLeftFooterColor,
      editLeftFooterSize,
      editLeftFooterFamily,
      editLeftFooterBackground
    );
    setEditLeftFooterColor("");
    setEditLeftFooterSize("");
    setEditLeftFooterFamily("");
    setEditLeftFooterBackground("");
    setEditingLeftFooter(false);
  };

  // Right Footer Satting
  const [isEditingRightFooter, setEditingRightFooter] = useState(false);

  const handleEditRightFooter = () => {
    setEditingRightFooter(true);
  };

  const handleCloseRightFooter = () => {
    setEditingRightFooter(false);
  };

  const [editRightFooterColor, setEditRightFooterColor] = useState(
    settings.rightFooterSetting?.color || ""
  );
  const [editRightFooterSize, setEditRightFooterSize] = useState(
    settings.rightFooterSetting?.size || ""
  );
  const [editRightFooterFamily, setEditRightFooterFamily] = useState(
    settings.rightFooterSetting?.family || ""
  );
  const [editRightFooterBackground, setEditRightFooterBackground] = useState(
    settings.rightFooterSetting?.background || ""
  );

  const handleSaveRightFooter = () => {
    updatedrightfooterStyle(
      editRightFooterColor,
      editRightFooterSize,
      editRightFooterFamily,
      editRightFooterBackground
    );
    setEditRightFooterColor("");
    setEditRightFooterSize("");
    setEditRightFooterFamily("");
    setEditRightFooterBackground("");
    setEditingRightFooter(false);
  };

  // Pagination Satting
  const [isEditingPagination, setEditingPagination] = useState(false);

  const handleEditPagination = () => {
    setEditingPagination(true);
  };

  const handleClosePagination = () => {
    setEditingPagination(false);
  };

  const [editPaginationButtonColor, setEditPaginationButtonColor] = useState(
    settings?.paginationSetting?.color || ""
  );
  const [editPaginationButtonSize, setEditPaginationButtonSize] = useState(
    settings?.paginationSetting?.size || ""
  );
  const [editPaginationButtonFamily, setEditPaginationButtonFamily] = useState(
    settings?.paginationSetting?.family || ""
  );
  const [editPaginationButtonBackground, setEditPaginationButtonBackground] =
    useState(settings?.paginationSetting?.background || "");

  const handleSavePagination = () => {
    updatedpaginationStyle(
      editPaginationButtonColor,
      editPaginationButtonSize,
      editPaginationButtonFamily,
      editPaginationButtonBackground
    );
    setEditPaginationButtonColor("");
    setEditPaginationButtonSize("");
    setEditPaginationButtonFamily("");
    setEditPaginationButtonBackground("");
    setEditingPagination(false);
  };

  // Links Settings
  const [isEditingLinks, setEditingLinks] = useState(false);

  const handleEditLinks = () => {
    setEditingLinks(true);
  };

  const handleCloseLinks = () => {
    setEditingLinks(false);
  };

  const [editLinksColor, setEditLinksColor] = useState(
    settings.linksSettings?.color || ""
  );
  const [editLinksSize, setEditLinksSize] = useState(
    settings.linksSettings?.size || ""
  );
  const [editLinksFamily, setEditLinksFamily] = useState(
    settings.linksSettings?.family || ""
  );
  const [editLinksBackground, setEditLinksBackground] = useState(
    settings.linksSettings?.background || ""
  );

  const handleSaveLinks = () => {
    updatedLinksStyle(
      editLinksColor,
      editLinksSize,
      editLinksFamily,
      editLinksBackground
    );
    setEditLinksColor("");
    setEditLinksSize("");
    setEditLinksFamily("");
    setEditLinksBackground("");
    setEditingLinks(false);
  };

  // const [backGround, setBackGround] = useState(null)

  const bgList = [
    ["Roseanna", "#ffafbd → #ffc3a0"],
    ["Purple Love", "#cc2b5e → #753a88"],
    ["Piglet", "#ee9ca7 → #ffdde1"],
    ["Mauve", "#42275a → #734b6d"],
    ["50 Shades of Grey", "#bdc3c7 → #2c3e50"],
    ["A Lost Memory", "#de6262 → #ffb88c"],
    ["Socialive", "#06beb6 → #48b1bf"],
    ["Cherry", "#eb3349 → #f45c43"],
    ["Pinky", "#dd5e89 → #f7bb97"],
    ["Lush", "#56ab2f → #a8e063"],
    ["Kashmir", "#614385 → #516395"],
    ["Tranquil", "#eecda3 → #ef629f"],
    ["Pale Wood", "#eacda3 → #d6ae7b"],
    ["Green Beach", "#02aab0 → #00cdac"],
    ["Sha La La", "#d66d75 → #e29587"],
    ["Virgin America", "#7b4397 → #dc2430"],
    ["Bloody Mary", "#ff512f → #dd2476"],
  ];

  const handleBackground = (e) => {
    let bg = e.target.value;
    updateLgBackground(bg);
  };

  const lgBackground = (bg) => {
    bg = bg.split(" → ");
    return `linear-gradient(to right, ${bg[0]} , ${bg[1]})`;
  };

  const lgvBackground = (value) => {
    const temp = bgList.filter((row) => {
      return row[1] === value;
    });
    return temp[0][0];
  };

  // Logo settings
  const [logo, setlogo] = useState(settings.logo);

  // const info = `1920px:1200px`

  const DriveUrl = (logoUrl) => {
    let link = logoUrl;
    if (logoUrl?.indexOf("https://drive.google.com") > -1) {
      var id = logoUrl.match(/[-\w]{25,}/)[0];
      link = "http://drive.google.com/uc?export=view&id=" + id;
    }
    return link;
  };

  const refCloseLogo = useRef(null);
  const onChangeLogo = (e) => {
    const value = e.target.value;
    setlogo(value);
  };

  const handleUpdateLogo = () => {
    refCloseLogo.current.click();
  };

  // Background Image Settings
  const [image, setImage] = useState(settings.backgroundImage);

  const imageUrl = DriveUrl(settings.backgroundImage);
  const refCloseImage = useRef(null);
  const onChangeImage = (e) => {
    const value = e.target.value;
    setImage(value);
  };

  const handleUpdateImage = () => {
    updateBgImage(image);
    refCloseImage.current.click();
  };

  const [header, setHeader] = useState(settings.header);
  const onchangeHeader = (e) => {
    setHeader(e.target.value);
  };
  const handleheader = () => {
    addHeader(header);
  };

  const [description, setDescription] = useState(settings.description);
  const onchangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handledescription = () => {
    addDescription(description);
  };

  // left footer
  const [leftFooter, setLeftFooter] = useState({
    leftFooterName: "",
    leftFooterURL: "",
  });
  // const [leftFooter, setLeftFooter] = useState(settings.leftFooter && settings.leftFooter[0]);
  const [leftfooter, setleftfooter] = useState(
    settings.leftFooter && settings.leftFooter[0]
  );
  const onChangeleft = (e) => {
    setLeftFooter({ ...leftFooter, [e.target.name]: e.target.value });
    setleftfooter({ ...leftfooter, [e.target.name]: e.target.value });
  };
  const handleAddleft = () => {
    updateleftfooter(leftFooter);
  };

  // right footer
  const [rightFooter, setRightFooter] = useState({
    rightFooterName: "",
    rightFooterURL: "",
  });
  const onChangeright = (e) => {
    setRightFooter({ ...rightFooter, [e.target.name]: e.target.value });
  };
  const handleAddright = () => {
    updaterightfooter(rightFooter);
  };

  useEffect(() => {
    getSettings();
    getLinks();
    fetchclicks();
  }, []);

  useEffect(() => {
    setHeader(settings.header);
    setDescription(settings.description);

    // Header
    setEditedFontColor(
      settings?.headersSettings?.fontColor
        ? settings.headersSettings.fontColor
        : ""
    );
    setEditedFontSize(
      settings?.headersSettings?.fontSize
        ? settings.headersSettings.fontSize
        : ""
    );
    setEditedFontFamily(
      settings?.headersSettings?.fontFamily
        ? settings.headersSettings.fontFamily
        : ""
    );

    // Description
    setEditDescColor(
      settings?.descriptionSettings?.color
        ? settings.descriptionSettings.color
        : ""
    );

    setEditDescFontFamily(
      settings?.descriptionSettings?.family
        ? settings.descriptionSettings.family
        : ""
    );

    setEditDescSize(
      settings?.descriptionSettings?.size
        ? settings.descriptionSettings.size
        : ""
    );

    // Pagination
    setEditPaginationButtonColor(
      settings?.paginationSetting?.color ? settings.paginationSetting.color : ""
    );
    setEditPaginationButtonSize(
      settings?.paginationSetting?.size ? settings.paginationSetting.size : ""
    );
    setEditPaginationButtonBackground(
      settings?.paginationSetting?.background
        ? settings.paginationSetting.background
        : ""
    );

    setEditPaginationButtonFamily(
      settings?.paginationSetting?.family
        ? settings.paginationSetting.family
        : ""
    );

    // Link
    setEditLinksColor(
      settings?.linksSettings?.color ? settings.linksSettings.color : ""
    );
    setEditLinksSize(
      settings?.linksSettings?.size ? settings.linksSettings.size : ""
    );
    setEditLinksFamily(
      settings?.linksSettings?.family ? settings.linksSettings.family : ""
    );
    setEditLinksBackground(
      settings?.linksSettings?.background
        ? settings.linksSettings.background
        : ""
    );

    // Left Footer
    setEditLeftFooterSize(
      settings?.leftFooterSetting?.size ? settings.leftFooterSetting.size : ""
    );
    setEditLeftFooterColor(
      settings?.leftFooterSetting?.color ? settings.leftFooterSetting.color : ""
    );
    setEditLeftFooterFamily(
      settings?.leftFooterSetting?.family
        ? settings.leftFooterSetting.family
        : ""
    );
    setEditLeftFooterBackground(
      settings?.leftFooterSetting?.background
        ? settings.leftFooterSetting.background
        : ""
    );
    // Right Footer
    setEditRightFooterSize(
      settings?.rightFooterSetting?.size ? settings.rightFooterSetting.size : ""
    );
    setEditRightFooterColor(
      settings?.rightFooterSetting?.color
        ? settings.rightFooterSetting.color
        : ""
    );
    setEditRightFooterFamily(
      settings?.rightFooterSetting?.family
        ? settings.rightFooterSetting.family
        : ""
    );
    setEditRightFooterBackground(
      settings?.rightFooterSetting?.background
        ? settings.rightFooterSetting.background
        : ""
    );

    setLeftFooter(
      settings?.leftFooter?.length > 0 ? settings?.leftFooter[0] : ""
    );
    setRightFooter(
      settings?.rightFooter?.length > 0 ? settings?.rightFooter[0] : ""
    );
  }, [settings]);

  return (
    <div className="">
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Settings</h2>
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className="input-group " style={{}}>
          {/* <!-- Button trigger modal --> */}
          <button
            className="btn btn-outline-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#previewModel"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
          <input
            type="text"
            className="form-control"
            aria-label="Add Header"
            aria-describedby="button-addon2"
            value={previewUrl}
            onChange={onchangeHeader}
            disabled
          />
          <button
            className="btn btn-outline-success"
            type="button"
            id="button-addon2"
            onClick={() => {
              navigator.clipboard.writeText(previewUrl);
            }}
          >
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="previewModel"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Preview</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div> */}
              {links?.length > 0 && settings.logo && (
                <Preview viewsetting={settings} viewlinks={links} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-evenly">
        <div>
          <div
            className=""
            style={{
              height: "80px",
              width: "80px",
            }}
          >
            {settings.logo && (
              <img
                src={DriveUrl(settings.logo)}
                alt="Logo"
                style={{ height: "80px", width: "80px", objectFit: "contain" }}
              />
            )}
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <div
              className=""
              style={{
                height: "25px",
                width: "25px",
                border: "1px solid black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className="btn btn-none shadow-none"
                data-bs-toggle="modal"
                data-bs-target="#uploadImageModel"
              >
                <i className="fa-solid fa-upload"></i>
              </button>
            </div>
            Logo
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="uploadImageModel"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Logo URL
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      class="form-control"
                      id="logoInput1"
                      value={logo}
                      onChange={onChangeLogo}
                      placeholder="Google Drive URL of logo"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      ref={refCloseLogo}
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdateLogo}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className=""
            style={{
              height: "80px",
              width: "120px",
              // border: "1px solid black"
            }}
          >
            {settings.backgroundImage && (
              <img
                src={imageUrl}
                alt="Background"
                style={{ height: "80px", width: "120px", objectFit: "contain" }}
              />
            )}
          </div>
          <div className="d-flex align-items-center">
            <div
              className=""
              style={{
                height: "25px",
                width: "25px",
                border: "1px solid black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className="btn btn-none shadow-none"
                data-bs-toggle="modal"
                data-bs-target="#backgroundModel"
              >
                <i className="fa-solid fa-upload"></i>
              </button>
            </div>
            Background
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="backgroundModel"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Background Image
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      class="form-control"
                      id="backgroundInput1"
                      onChange={onChangeImage}
                      placeholder="Google Drive URL of Background Image"
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      ref={refCloseImage}
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdateImage}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="">
            <div
              className="horizontal-gradient"
              style={{
                width: "120px",
                height: "80px",
                background: `${
                  settings.background && lgBackground(settings.background)
                }`,
              }}
            ></div>
          </div>
          <div className="my-auto" style={{ maxWidth: "120px" }}>
            <select
              className="form-select my-1 p-1"
              aria-label=""
              value={settings.background && lgvBackground(settings.background)}
              onChange={handleBackground}
            >
              <option selected>Background</option>
              {bgList.map((list) => (
                <option value={list[1]}>{list[0]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-3">
        <div className="input-group " style={{}}>
          <input
            type="text"
            className="form-control"
            placeholder="Add Header"
            aria-label="Add Header"
            aria-describedby="button-addon2"
            value={header}
            onChange={onchangeHeader}
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={handleheader}
          >
            Add
          </button>

          <button
            style={{ marginLeft: "5px" }}
            className="btn btn-primary"
            type="button"
            onClick={handleEditClick}
          >
            <i class="fa-solid fa-gear"></i>
          </button>
          {/* {settings.header === "" ?
            <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleheader} >Add</button> :
            <button className="btn btn-primary" type="button" id="button-addon2" >Edit</button>
          } */}
        </div>
      </div>

      <div className="d-flex justify-content-center my-3">
        <div className="input-group " style={{}}>
          <textarea
            type="text"
            rows="2"
            className="form-control"
            placeholder="Add Description"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={description}
            onChange={onchangeDescription}
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={handledescription}
          >
            Add
          </button>
          <button
            style={{ marginLeft: "5px" }}
            className="btn btn-primary"
            type="button"
            onClick={handleEditdescription}
          >
            <i class="fa-solid fa-gear"></i>
          </button>
          {/* {settings.description === "" ?
            <button className="btn btn-primary" type="button" id="button-addon2" >Add</button> :
            <button className="btn btn-primary" type="button" id="button-addon2" >Edit</button>
          } */}
        </div>
      </div>

      <div className="d-flex justify-content-between my-3 ">
        <div class="form-check form-switch">
          <input
            type="checkbox"
            checked={settings.footer}
            onChange={handleFooter}
            className="form-check-input"
          />
          <label class="form-check-label" for="flexSwitchCheckChecked">
            Footer
          </label>
        </div>

        <div class="form-check form-switch ">
          <input
            type="checkbox"
            checked={settings.search}
            onChange={handleSearch}
            className="form-check-input"
          />
          <label class="form-check-label " for="flexSwitchCheckChecked">
            Search
          </label>
        </div>
        <div>
          <button
            style={{ padding: "0px 3px" }}
            className="btn btn-primary "
            type="button"
            onClick={handleEditLinks}
          >
            Links
            <i class="fa-solid fa-gear m-1"></i>
          </button>
        </div>
        <div>
          <button
            style={{ padding: "0px 3px" }}
            className="btn btn-primary "
            type="button"
            onClick={handleEditPagination}
          >
            Pagination
            <i class="fa-solid fa-gear m-1"></i>
          </button>
        </div>
      </div>

      {settings.footer && (
        <div>
          <div className="d-flex justify-content-center my-3">
            <div class="input-group">
              <span>
                <input
                  type="text"
                  class="form-control"
                  name="leftFooterName"
                  aria-label="Text input with dropdown button"
                  value={leftFooter.leftFooterName}
                  onChange={onChangeleft}
                  placeholder="Left Footer Name"
                />
              </span>
              <input
                type="text"
                class="form-control"
                name="leftFooterURL"
                aria-label="Text input with dropdown button"
                value={leftFooter.leftFooterURL}
                onChange={onChangeleft}
                placeholder="Left Footer URL"
              />
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddleft}
              >
                ADD
              </button>
              <button
                style={{ marginLeft: "5px" }}
                className="btn btn-primary"
                type="button"
                onClick={handleEditLeftFooter}
              >
                <i class="fa-solid fa-gear"></i>
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-center my-3">
            <div class="input-group">
              <span>
                <input
                  type="text"
                  class="form-control"
                  name="rightFooterName"
                  aria-label="Text input with dropdown button"
                  value={rightFooter.rightFooterName}
                  onChange={onChangeright}
                  placeholder="Right Footer Name"
                />
              </span>
              <input
                type="text"
                class="form-control"
                name="rightFooterURL"
                aria-label="Text input with dropdown button"
                value={rightFooter.rightFooterURL}
                onChange={onChangeright}
                placeholder="Right Footer URL"
              />
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleAddright}
              >
                ADD
              </button>
              <button
                style={{ marginLeft: "5px" }}
                className="btn btn-primary"
                type="button"
                onClick={handleEditRightFooter}
              >
                <i class="fa-solid fa-gear"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {<AddSocialLink />}

      <CustomModal
        show={isEditing}
        handleClose={handleClose}
        heading={"Edit Header Settings"}
      >
        <div className="form-group">
          <input
            type="text"
            id="fontSize"
            name="fontSize"
            class="form-control"
            placeholder="Enter font size in pixel"
            value={editedFontSize}
            onChange={(e) => setEditedFontSize(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select
            required
            className="form-control my-2"
            id="fontFamily"
            name="fontFamily"
            value={editedFontFamily}
            onChange={(e) => setEditedFontFamily(e.target.value)}
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="Roboto">Roboto</option>
            <option value="serif">Serif</option>
            <option value="arial">Arial</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Futura">Futura</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
            <option value="Palatino">Palatino</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="text"
            id="fontColor"
            class="form-control my-2"
            name="fontColor"
            placeholder="Enter color"
            value={editedFontColor}
            onChange={(e) => setEditedFontColor(e.target.value)}
          />
          <ColorPicker />
        </div>
        <div className="modal-footer px-0">
          <button
            className="btn btn-primary px-2"
            style={{ fontSize: "14px", padding: "5px 10px" }}
            onClick={handleSaveClick}
          >
            Save Changes
          </button>
          <button
            style={{ fontSize: "14px", padding: "5px 10px" }}
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <CustomModal
        show={isEditingDescription}
        handleClose={handleClosedescription}
        heading={"Edit Description Settings"}
      >
        <div className="form-group">
          <input
            type="text"
            id="fontSize"
            name="fontSize"
            class="form-control"
            placeholder="Enter font size in pixel"
            value={editDescSize}
            onChange={(e) => setEditDescSize(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select
            required
            className="form-control my-2"
            id="fontFamily"
            name="fontFamily"
            value={editDescFontFamily}
            onChange={(e) => setEditDescFontFamily(e.target.value)}
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="Roboto">Roboto</option>
            <option value="serif">Serif</option>
            <option value="arial">Arial</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Futura">Futura</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
            <option value="Palatino">Palatino</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="text"
            id="fontColor"
            class="form-control my-2"
            name="fontColor"
            placeholder="Enter color"
            value={editDescColor}
            onChange={(e) => setEditDescColor(e.target.value)}
          />
          <ColorPicker />
        </div>
        <div className="modal-footer px-0">
          <button
            className="btn btn-primary"
            style={{ fontSize: "14px", padding: "5px 10px" }}
            onClick={handleSaveDescription}
          >
            Save Changes
          </button>
          <button
            style={{ fontSize: "14px", padding: "5px 10px" }}
            type="button"
            className="btn btn-secondary"
            onClick={handleClosedescription}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <CustomModal
        show={isEditingLeftFooter}
        handleClose={handleCloseLeftFooter}
        heading={"Edit Left Footer Settings"}
      >
        <div className="form-group">
          <input
            type="text"
            id="fontSize"
            name="fontSize"
            class="form-control "
            placeholder="Enter font size in pixel"
            value={editLeftFooterSize}
            onChange={(e) => setEditLeftFooterSize(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select
            required
            className="form-control my-2"
            id="fontFamily"
            name="fontFamily"
            value={editLeftFooterFamily}
            onChange={(e) => setEditLeftFooterFamily(e.target.value)}
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="Roboto">Roboto</option>
            <option value="serif">Serif</option>
            <option value="arial">Arial</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Futura">Futura</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
            <option value="Palatino">Palatino</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            class="form-control my-2"
            id="background "
            name="background "
            placeholder="Enter background color "
            value={editLeftFooterBackground}
            onChange={(e) => setEditLeftFooterBackground(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            id="fontColor"
            class="form-control  my-2"
            name="fontColor"
            placeholder="Enter color"
            value={editLeftFooterColor}
            onChange={(e) => setEditLeftFooterColor(e.target.value)}
          />
          <ColorPicker />
        </div>
        <div className="modal-footer px-0">
          <button
            className="btn btn-primary"
            style={{ fontSize: "14px", padding: "5px 10px" }}
            onClick={handleSaveLeftFooter}
          >
            Save Changes
          </button>
          <button
            style={{ fontSize: "14px", padding: "5px 10px" }}
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseLeftFooter}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <CustomModal
        show={isEditingRightFooter}
        handleClose={handleCloseRightFooter}
        heading={"Edit Right Footer Settings"}
      >
        <div className="form-group">
          <input
            required
            type="text"
            id="fontSize"
            name="fontSize"
            class="form-control"
            placeholder="Enter font size in pixel"
            value={editRightFooterSize}
            onChange={(e) => setEditRightFooterSize(e.target.value)}
          />
        </div>

        <div className="form-group">
          <select
            required
            className="form-control my-2"
            id="fontFamily"
            name="fontFamily"
            value={editRightFooterFamily}
            onChange={(e) => setEditRightFooterFamily(e.target.value)}
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="Roboto">Roboto</option>
            <option value="serif">Serif</option>
            <option value="arial">Arial</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Futura">Futura</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
            <option value="Palatino">Palatino</option>
          </select>
        </div>
        <div className="form-group">
          <input
            required
            type="text"
            class="form-control my-2"
            id="background "
            name="background "
            placeholder="Enter background color "
            value={editRightFooterBackground}
            onChange={(e) => setEditRightFooterBackground(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            required
            type="text"
            id="fontColor"
            class="form-control my-2"
            name="fontColor"
            placeholder="Enter color"
            value={editRightFooterColor}
            onChange={(e) => setEditRightFooterColor(e.target.value)}
          />
          <ColorPicker />
        </div>
        <div className="modal-footer px-0">
          <button
            className="btn btn-primary btn-small"
            onClick={handleSaveRightFooter}
            style={{ fontSize: "14px", padding: "5px 10px" }}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseRightFooter}
            style={{ fontSize: "14px", padding: "5px 10px" }}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <CustomModal
        show={isEditingPagination}
        handleClose={handleClosePagination}
        heading={"Edit Pagination Settings"}
      >
        <div className="form-group">
          <input
            required
            type="text"
            id="fontSize"
            name="fontSize"
            class="form-control"
            placeholder="Enter font size in pixel"
            value={editPaginationButtonSize}
            onChange={(e) => setEditPaginationButtonSize(e.target.value)}
          />
        </div>

        <div className="input-group">
          <select
            required
            className="form-control my-2"
            id="fontFamily"
            name="fontFamily"
            value={editPaginationButtonFamily}
            onChange={(e) => setEditPaginationButtonFamily(e.target.value)}
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="Roboto">Roboto</option>
            <option value="serif">Serif</option>
            <option value="arial">Arial</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Futura">Futura</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
            <option value="Palatino">Palatino</option>
          </select>
        </div>
        <div className="input-group">
          <input
            required
            type="text"
            class="form-control "
            id="background "
            name="background "
            placeholder="Enter background color "
            value={editPaginationButtonBackground}
            onChange={(e) => setEditPaginationButtonBackground(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            required
            type="text"
            id="fontColor"
            class="form-control my-2"
            name="fontColor"
            placeholder="Enter color"
            value={editPaginationButtonColor}
            onChange={(e) => setEditPaginationButtonColor(e.target.value)}
          />
          <ColorPicker />
        </div>
        <div className="modal-footer px-0">
          <button
            className="btn btn-primary "
            onClick={handleSavePagination}
            style={{ fontSize: "14px", padding: "5px 10px" }}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClosePagination}
            style={{ fontSize: "14px", padding: "5px 10px" }}
          >
            Close
          </button>
        </div>
      </CustomModal>
      <CustomModal
        show={isEditingLinks}
        handleClose={handleCloseLinks}
        heading={"Edit Links Settings"}
      >
        <div className="form-group">
          <input
            required
            type="text"
            id="fontSize"
            name="fontSize"
            class="form-control"
            placeholder="Enter font size in pixel"
            value={editLinksSize}
            onChange={(e) => setEditLinksSize(e.target.value)}
          />
        </div>

        <div className="input-group">
          <select
            required
            className="form-control my-2"
            id="fontFamily"
            name="fontFamily"
            value={editLinksFamily}
            onChange={(e) => setEditLinksFamily(e.target.value)}
          >
            <option value="sans-serif">Sans-Serif</option>
            <option value="Roboto">Roboto</option>
            <option value="serif">Serif</option>
            <option value="arial">Arial</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Futura">Futura</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Calibri">Calibri</option>
            <option value="Verdana">Verdana</option>
            <option value="Palatino">Palatino</option>
          </select>
        </div>
        <div className="input-group">
          <input
            required
            type="text"
            class="form-control "
            id="background "
            name="background "
            placeholder="Enter background color "
            value={editLinksBackground}
            onChange={(e) => setEditLinksBackground(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            required
            type="text"
            id="fontColor"
            class="form-control my-2"
            name="fontColor"
            placeholder="Enter color"
            value={editLinksColor}
            onChange={(e) => setEditLinksColor(e.target.value)}
          />
          <ColorPicker />
        </div>
        <div className="modal-footer px-0">
          <button
            className="btn btn-primary "
            onClick={handleSaveLinks}
            style={{ fontSize: "14px", padding: "5px 10px" }}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseLinks}
            style={{ fontSize: "14px", padding: "5px 10px" }}
          >
            Close
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default Settings;
