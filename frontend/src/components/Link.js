import { React, useState, useContext } from "react";
import * as Icon from "react-bootstrap-icons";
import { useMediaQuery } from "./hook.js";
import linkContext from "../context/links/linkContext";

const Link = (props) => {
  const { link } = props;
  const [shown, setShown] = useState(false);
  const context = useContext(linkContext);
  let { addClickInfo, viewsetting } = context;
  let { linksSettings } = viewsetting || {};

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [clickData, setClickData] = useState(false);

  const clickInfo = async (linkId, linkUrl) => {
    // city, country, latitude, longitude,linkID, linkUrl
    await fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.city);
        setCity(data.city);
        setCountry(data.country_name);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setClickData(true);
      })
      .catch((error) => console.log(error));

    if (clickData) {
      const data1 = {
        city: city,
        country: country,
        latitude: latitude,
        longitude: longitude,
        linkID: linkId,
        linkUrl: linkUrl,
      };
      addClickInfo(data1);
    }
  };

  const DriveUrl = (logoUrl) => {
    let logolink = logoUrl;
    if (logoUrl?.indexOf("https://drive.google.com") > -1) {
      let id = logoUrl.match(/[-\w]{25,}/)[0];
      logolink = "https://drive.google.com/uc?export=view&id=" + id;
    }
    // else if(logoUrl?.indexOf("https://www.youtube.com") > -1){
    //     let id = logoUrl.match(/[-\w]{25,}/)[0];
    //     logolink = 'https://www.youtube.com/embed/'+id;
    // }
    return logolink;
  };

  const isRowBased = useMediaQuery("(min-width: 500px)");
  const mystyle = {
    container: (isRowBased) => ({
      //   display: 'flex',
      //   justifyContent: 'space-between',
      padding: "5px",
      margin: "5px auto 0px auto",
      width: isRowBased ? "50%" : "90%",
      //   borderRadius: '5px',
      //   backgroundColor: box.bgColor,
      //   fontFamily: box.fontFamily,
      //   fontSize:box.fontSize,
      //   color:box.fontColor,
      //   alignItems: 'center',
    }),
  };

  const Renderlink = (props) => {
    const { link } = props;
    console.log(link);

    const isRowBased = useMediaQuery("(min-width: 500px)");
    const mystyle = {
      linksStyle: (isRowBased) => ({
        display: "flex",
        justifyContent: "center",
        padding: "5px",
        margin: "-5px auto 0px auto",
        width: isRowBased ? "45%" : "90%",
        backgroundColor: "#fff",
        borderTop: "2px solid FloralWhite",
        objectFit: "contain",
        borderRadius: "10px",
      }),
    };

    if (link.linkType === "Drive Video" || link.linkType === "Youtube Video") {
      return (
        <>
          <div style={mystyle.linksStyle(isRowBased)}>
            <iframe
              src={link.link}
              title="Drive Video"
              allowFullScreen
              height="300px"
              width="100%"
              objectFit="contain"
              borderRadius="10px"
            />
          </div>
        </>
      );
    } else if (
      link.linkType === "Normal Image Link" ||
      link.linkType === "Drive Image Link"
    ) {
      console.log(link.link);
      return (
        <>
          <div style={mystyle.linksStyle(isRowBased)}>
            <img
              src={DriveUrl(link.link)}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
                borderRadius: "10px",
              }}
              alt="images"
            />
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div style={mystyle.container(isRowBased)}>
        <div
          className="d-flex justify-content-between p-2 link"
          style={{ background: `${linksSettings?.background || ""}` }}
        >
          <div style={{ width: "40px", height: "40px" }}>
            {link.thumbnail && (
              <img
                src={DriveUrl(link.thumbnail)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
              />
            )}
          </div>
          <div className="m-2">
            {link.linkType === "Normal Link" ? (
              <a
                href={link.link}
                target="_blank"
                onClick={() => clickInfo(link._id, link.link)}
                style={{
                  textDecoration: "none",
                  color: `${linksSettings?.color || ""}`,
                  fontSize: `${linksSettings?.size || ""}`,
                  fontFamily: `${linksSettings?.family || ""}`,
                }}
              >
                <h6
                  style={{
                    marginBottom: "0",
                    color: `${linksSettings?.color || ""}`,
                    fontSize: `${linksSettings?.size || ""}`,
                    fontFamily: `${linksSettings?.family || ""}`,
                  }}
                >
                  {link.description}
                </h6>
              </a>
            ) : (
              <h6
                style={{
                  marginBottom: "0",
                  color: `${linksSettings?.color || ""}`,
                  fontSize: `${linksSettings?.size || ""}`,
                  fontFamily: `${linksSettings?.family || ""}`,
                }}
              >
                {link.description}
              </h6>
            )}
          </div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px", borderRadius: "100%" }}
          >
            {link.linkType === "Normal Link" ? (
              ""
            ) : (
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: `${linksSettings?.color || ""}`,
                }}
                onClick={() => {
                  setShown(!shown);
                  shown && clickInfo(link._id, link.link);
                }}
              >
                {shown ? (
                  <Icon.ChevronUp size={16} />
                ) : (
                  <Icon.ChevronDown size={16} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {shown ? <Renderlink link={link} /> : null}
    </>
  );
};

export default Link;
