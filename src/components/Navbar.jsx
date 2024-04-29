import React from "react";
import "../styles/navbar.css";
import users from "../assets/profile.jpeg";

export const Navbar = ({setShowModal,setIsCreated, setModalType}) => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#BF0098" }}
    >
      <div className="container-fluid px-3">
        <div className="row align-items-center">
          <div className="col-auto">
            <p className="btn glass-morphism my-auto">
              <i className="fs-4 text-white fa-solid fa-table-cells"></i>
            </p>
          </div>
          <div className="col-auto pe-0">
            <p className="btn glass-morphism my-auto">
              <i className="fs-4 text-white fa-solid fa-home"></i>
            </p>
          </div>
          <div className="col">
            <div className="form-group glass-morphism has-search-right">
              <a href="#" className="form-control-feedback">
                <span className="fa-solid fa-magnifying-glass"></span>
              </a>
              <input
                type="text"
                className="glass-morphism form-control outline-none"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-white"><span className="me-2"><i class="fs-4 fa-regular fa-newspaper"></i></span>Trello</h2>
        </div>

        <div className="row align-items-center">
          <div className="col-auto pe-0">
            <div
              className="col-auto pe-0"
              onClick={()=>{
                setIsCreated(true)
                setShowModal(true)
                setModalType("");
                
              }}
            >
              <p className="btn glass-morphism my-auto">
                <i className="fs-4 text-white fa-solid fa-plus"></i>
              </p>
            </div>
          </div>
          <div className="col-auto pe-0">
            <p className="btn glass-morphism my-auto">
              <i className="fs-4 text-white fa-solid fa-circle-exclamation"></i>
            </p>
          </div>
          <div className="col-auto pe-0">
            <p className="btn glass-morphism my-auto">
              <i className="fs-4 text-white fa-regular fa-bell"></i>
            </p>
          </div>
          <div className="col-auto pe-0">
            <div>
              <img
                src={users}
                className="me-1 rounded-circle"
                width="35px"
                height="35px"
                alt="profile"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
