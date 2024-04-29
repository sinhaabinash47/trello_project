import React, { useEffect, useState } from "react";
import "../styles/trello.css";
import users1 from "../assets/profile1.jpeg";
import users2 from "../assets/profile3.jpeg";
import users3 from "../assets/profile4.jpeg";
import users4 from "../assets/profile.jpeg";
import users5 from "../assets/profile.jpeg";
import users6 from "../assets/profile.jpeg";
import users7 from "../assets/profile.jpeg";
import users8 from "../assets/profile.jpeg";
import { TrelloCards } from "./TrelloCards";

export const TrelloLayouts = ({
  refresh,
  setShowModal,
  setIsCreated,
  setSelectedCardId,
  toggleRefresh,
  setModalType
}) => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [getData, setGetData] = useState([]);

  const imageSource = [
    { src: users1, alt: "img1" },
    { src: users2, alt: "img2" },
    { src: users3, alt: "img3" },
    { src: users4, alt: "img4" },
    { src: users5, alt: "img5" },
    { src: users6, alt: "img6" },
    { src: users7, alt: "img7" },
    { src: users8, alt: "img8" },
  ];

  useEffect(() => {
    const getData = localStorage.getItem("cards");
    const getParseData = JSON.parse(getData);
    setGetData(getParseData);
  }, [refresh]);

  return (
    <div className="d-flex" style={{ height: "calc(100vh - 62px)" }}>
      <div
        onClick={() => setToggleSideBar((prev) => !prev)}
        className={`sidebard_background p-3 ${
          toggleSideBar ? "expanded-sidebar" : "collapsed-sidebar"
        }`}
      >
        <div>
          <span className="underline" style={{ backgroundColor: "cyan" }}>
            ACME
          </span>
        </div>
        <div className="mt-2" style={{ cursor: "pointer" }}>
          <span>
            <i
              className={`fs-4 text-white fa-solid fa-angles-right ${
                toggleSideBar
                  ? "rotate-collapsible-logo-left"
                  : "rotate-collapsible-logo-right"
              }`}
            ></i>
          </span>
        </div>
      </div>
      <div className="w-100 trello_background">
        <div className="d-flex justify-content-between flex-wrap p-2">
          <div className="d-flex align-items-center flex-wrap">
            <div className="col-auto pe-0" style={{ marginLeft: "5px" }}>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn glass-morphism my-auto dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fs-5 text-white fa-solid fa-square-poll-horizontal"></i>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      {" "}
                      Action{" "}
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-auto pe-0" style={{ marginLeft: "5px" }}>
              <h5 className="text-white">Project Team Spirit</h5>
            </div>
            <div className="col-auto pe-0" style={{ marginLeft: "5px" }}>
              <p className="btn glass-morphism my-auto">
                <i className="fs-5 text-white fa-regular fa-star"></i>
              </p>
            </div>
            <div className="col-auto pe-0" style={{ marginLeft: "5px" }}>
              <p className="btn text-white glass-morphism my-auto">
                Acme, Inc.
              </p>
            </div>
            <div className="col-auto pe-0" style={{ marginLeft: "5px" }}>
              <div className="d-flex">
                {imageSource.map(
                  (img, index) =>
                    index < 3 && (
                      <img
                        key={index}
                        src={img?.src}
                        className={`rounded-circle ${
                          index === 0
                            ? "first-avtar"
                            : index === 1
                            ? "second-avtar"
                            : "third-avtar"
                        }`}
                        width="35px"
                        height="35px"
                        alt={img.alt}
                      />
                    )
                )}
                <div className="fs-6 text-white btn glass-morphism rounded-circle my-auto">
                  {imageSource.length > 0 ? `+${imageSource.length - 3}` : ""}
                </div>
              </div>
            </div>
            <div className="col-auto pe-0" style={{ marginLeft: "5px" }}>
              <p className="btn text-white glass-morphism my-auto">Invite</p>
            </div>
          </div>
          <div>
            <div className="col-auto pe-0" style={{ marginLeft: "5px" }}>
              <div className="d-flex align-items-center gap-2 btn text-white glass-morphism my-auto">
                <i class="fa-solid fa-ellipsis"></i>{" "}
                <div
                  className="my-2"
                  style={{
                    width: "100px",
                    height: "10px",
                    backgroundColor: "#d1cbcb",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "calc(100vh - 122px)" }}>
          <TrelloCards
            getData={getData}
            setShowModal={setShowModal}
            setIsCreated={setIsCreated}
            setSelectedCardId={setSelectedCardId}
            toggleRefresh={toggleRefresh}
            setModalType={setModalType}
          />
        </div>
      </div>
    </div>
  );
};
