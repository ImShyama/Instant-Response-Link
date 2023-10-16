import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import linkContext from "../context/links/linkContext";
import Link from "./Link";
import SocialLink from "./SocialLink";
import { useMediaQuery } from "./hook.js";

const View = () => {
  const location = useLocation().pathname.split("/");
  const param = location[location.length - 1];
  const context = useContext(linkContext);
  let { loadLinks, loadSettings, viewsetting, viewlinks } = context;
  // console.log("viewlinks", viewsetting);

  const paginationSetting = viewsetting ? viewsetting.paginationSetting : "";

  useEffect(() => {
    loadLinks(param);
    loadSettings(param);
  }, []);

  const DriveUrl = (logoUrl) => {
    let link = logoUrl;
    if (logoUrl?.indexOf("https://drive.google.com") > -1) {
      var id = logoUrl.match(/[-\w]{25,}/)[0];
      link = "http://drive.google.com/uc?export=view&id=" + id;
    }
    return link;
  };

  const lgBackground = (bg) => {
    bg = bg.split(" → ");
    return `linear-gradient(to right, ${bg[0]} , ${bg[1]})`;
  };

  // console.log(viewsetting.backgroundImage)
  var bgImage = viewsetting?.backgroundImage;
  var bgLinear = viewsetting?.background;

  // console.log("bgImage", bgImage);
  // console.log(typeof bgImage)
  // console.log(typeof bgLinear !== "undefined")

  const backgroundStyle = {
    backgroundImage: bgImage !== "" && `url(${DriveUrl(bgImage)})`,
    background:
      bgImage === "" && typeof bgLinear !== "undefined"
        ? `${bgLinear && lgBackground(bgLinear)}`
        : "#fff",
    minHeight: "100vh",
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no - repeat",
    backgroundSize: "cover",
    position: "relative",
    top: "0",
    bottom: "0",
    boxSizing: "border-box",
  };

  // Search filter
  const [search, setSearch] = useState("");
  const isRowBased = useMediaQuery("(min-width: 500px)");
  const customStyles = {
    search: (isRowBased) => ({
      padding: "10px",
      marginInline: "20px",
      borderRadius: "8px",
      width: isRowBased ? "20%" : "60%",
      border: "none",
      cursor: "pointer",
      border: "none",
    }),
  };

  const styleSearch = {
    search: (isRowBased) => ({
      // textAlign: "right",
      textAlign: isRowBased ? "right" : "center",
      marginTop: isRowBased ? "" : "10px",
    }),
  };

  var searchData = viewlinks.filter((item) => {
    return search.toLocaleLowerCase() === ""
      ? item
      : item.description.toLocaleLowerCase().includes(search);
  });

  //Pagination constant
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  var records = searchData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(searchData.length / recordsPerPage);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="" style={backgroundStyle}>
      <div className="d-flex justify-content-center">
        {viewsetting && (
          <div className="m-2" style={{ textAlign: "center" }}>
            <div>
              {viewsetting.logo && (
                <img
                  src={DriveUrl(viewsetting.logo)}
                  style={{
                    width: "120px",
                    height: "120px",
                    margin: "10px",
                    padding: "5px",
                  }}
                />
              )}
            </div>
            <div>
              <h2
                style={{
                  color: `${viewsetting.headersSettings.fontColor}`,
                  fontFamily: `${viewsetting.headersSettings.fontFamily}`,
                  fontSize: `${viewsetting.headersSettings.fontSize}`,
                }}
              >
                {viewsetting.header}
              </h2>
            </div>
            <div>
              <h6
                style={{
                  color: `${viewsetting.descriptionSettings.color}`,
                  fontFamily: `${viewsetting.descriptionSettings.family}`,
                  fontSize: `${viewsetting.descriptionSettings.size}`,
                }}
              >
                {viewsetting.description}
              </h6>
            </div>
          </div>
        )}
      </div>
      <div style={styleSearch.search(isRowBased)}>
        {viewsetting?.search && (
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            style={customStyles.search(isRowBased)}
            id="gsearch"
            name="gsearch"
            placeholder="Search"
          />
        )}
      </div>
      <div>
        {records.map((link) => (
          <Link link={link} />
        ))}
      </div>
      <div className="d-flex justify-content-evenly my-3">
        {viewsetting?.footer ? (
          <div>
            <a
              style={{
                color: `${viewsetting.leftFooterSetting.color}`,
                fontFamily: `${viewsetting.leftFooterSetting.family}`,
                fontSize: `${viewsetting.leftFooterSetting.size}`,
                backgroundColor: `${viewsetting.leftFooterSetting.background}`,
              }}
              type="button"
              class="btn btn-primary"
              href={viewsetting.leftFooter[0].leftFooterURL}
              target="_blank"
            >
              {viewsetting.leftFooter[0].leftFooterName}
            </a>
          </div>
        ) : (
          <div>
            <a
              type="button"
              style={{ visibility: "hidden" }}
              class="btn btn-primary"
            >
              {viewsetting?.leftFooter[0].leftFooterName}
            </a>
          </div>
        )}
        {npage > 0 && (
          <div className="d-flex justify-content-evenly">
            <div className="mx-2">
              <button
                style={{
                  color: `${paginationSetting.color}`,
                  fontFamily: `${paginationSetting.family}`,
                  fontSize: `${paginationSetting.size}`,
                  backgroundColor: `${paginationSetting.background}`,
                  borderRadius: "10px",
                }}
                type="button"
                class="btn btn-outline-primary"
                onClick={prevPage}
              >
                Previous
              </button>
            </div>
            <div className="mx-2">
              <button
                style={{
                  color: `${paginationSetting.color}`,
                  fontFamily: `${paginationSetting.family}`,
                  fontSize: `${paginationSetting.size}`,
                  backgroundColor: `${paginationSetting.background}`,
                  borderRadius: "10px",
                }}
                type="button"
                class="btn btn-outline-primary"
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {viewsetting?.footer &&
        viewsetting?.rightFooter[0].rightFooterName !== "" ? (
          <div>
            <a
              style={{
                color: `${viewsetting.rightFooterSetting.color}`,
                fontFamily: `${viewsetting.rightFooterSetting.family}`,
                fontSize: `${viewsetting.rightFooterSetting.size}`,
                backgroundColor: `${viewsetting.rightFooterSetting.background}`,
              }}
              type="button"
              class="btn btn-primary"
              href={viewsetting.leftFooter[0].leftFooterURL}
            >
              {viewsetting.rightFooter[0].rightFooterName}
            </a>
          </div>
        ) : (
          <div>
            <a
              type="button"
              style={{ visibility: "hidden" }}
              class="btn btn-primary"
            >
              {viewsetting?.rightFooter[0].rightFooterName}
            </a>
          </div>
        )}
      </div>

      {
        viewsetting?.socialLinks.length > 0 && (
          // <div style={{bottom:'20px', position:'fixed', width:'100%', margin:'auto'}}>
          <div className="d-flex justify-content-center">
            {viewsetting.socialLinks.map((socialLink) => {
              return (
                <SocialLink
                  linktype={socialLink.linkType}
                  linkurl={socialLink.linkUrl}
                />
              );
            })}
            {/* <SocialLink /> */}
          </div>
        )
        // </div>
      }
    </div>
  );
};

export default View;
