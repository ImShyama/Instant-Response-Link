import React from "react";

const CustomModal = ({
  show,
  handleClose,
  heading,
  children,
}) => {
  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{heading}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
         
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
