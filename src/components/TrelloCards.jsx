import React, { useState } from "react";
import users1 from "../assets/profile1.jpeg";
import users2 from "../assets/profile3.jpeg";

const MAX_DESCRIPTION_LENGTH = 60;

export const TrelloCards = ({
  getData,
  setShowModal,
  setIsCreated,
  setSelectedCardId,
  toggleRefresh,
  setModalType,
}) => {
  const [draggeCard, setDraggeCard] = useState(null);
  const [showFullDescriptions, setShowFullDescriptions] = useState({});

  const handleDragStart = (e, cardId) => {
    setDraggeCard(cardId);
  };

  const handleDrop = (e, status) => {
    const mainData = [...getData];
    const filterData = mainData?.map((item) => {
      console.log(status, "status");
      if (item?.id === draggeCard) {
        return {
          ...item,
          status: status,
        };
      } else return item;
    });
    toggleRefresh();
    localStorage.setItem("cards", JSON.stringify(filterData));
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncated = words.slice(0, 10).join(" ");
    return truncated + (words.length > 10 ? "..." : "");
  };
  const toggleDescription = (index) => {
    setShowFullDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      <div className="row m-0">
        <div className="col" onDragOver={(e) => handleDrop(e, "Todo")}>
          <div
            className="card scrollbar-yaxis"
            style={{
              backgroundColor: "#EBEBF0",
              borderRadius: "3px",
              maxHeight: "calc(100vh - 125px)",
            }}
          >
            <div className="card-body">
              <div className="sticky-body">
                <div className="d-flex justify-content-between w-100 align-items-center px-2">
                  <h5 className="card-title">To Do</h5>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </div>
              <div
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
              >
                {getData?.map(
                  (item, index) =>
                    item?.status === "Todo" && (
                      <div className="mt-2 card" key={index}>
                        <div
                          className="card-body"
                          draggable
                          onDragStart={(e) => handleDragStart(e, item?.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between mb-0">
                            <div className="d-flex gap-2">
                              <div
                                className="rounded-pill"
                                style={{
                                  width: "50px",
                                  height: "10px",
                                  backgroundColor: "#00C6EA",
                                }}
                              ></div>
                              <div
                                className="rounded-pill"
                                style={{
                                  width: "50px",
                                  height: "10px",
                                  backgroundColor: "#FF4CCC",
                                }}
                              ></div>
                            </div>
                            <div
                              onClick={() => {
                                setShowModal(true);
                                setIsCreated(false);
                                setSelectedCardId(item.id);
                                setModalType("delete");
                              }}
                            >
                              <i class="fs-56 text-danger fa-solid fa-trash-can"></i>
                            </div>
                          </div>
                          <div
                            style={{
                              width: "150px",
                              height: "10px",
                              backgroundColor: "#d1cbcb",
                            }}
                          ></div>
                          <p className="card-text fw-bold mb-0 mt-2">
                            {item?.title}
                          </p>
                          <p className="card-text" style={{textAlign:"justify"}}>
                            {showFullDescriptions[index]
                              ? item?.description
                              : truncateDescription(item?.description)}
                            {item?.description.split(" ").length > 10 && (
                              <span
                                className="text-primary"
                                onClick={() => toggleDescription(index)}
                              >
                                {showFullDescriptions[index]
                                  ? "Show less"
                                  : "Read more"}
                              </span>
                            )}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i
                                onClick={() => {
                                  setShowModal(true);
                                  setIsCreated(false);
                                  setSelectedCardId(item?.id);
                                  setModalType("");
                                }}
                                className="fa-regular fa-eye me-3"
                                style={{ cursor: "pointer" }}
                              ></i>
                              <i className="fa-solid fa-paperclip me-2"></i>
                              <span>2</span>
                            </div>
                            <div>
                              <img
                                src={users1}
                                className="me-1 rounded-circle"
                                width="35px"
                                height="35px"
                                alt="profile"
                              />
                              <img
                                src={users2}
                                className="rounded-circle"
                                width="35px"
                                height="35px"
                                alt="profile"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col" onDragOver={(e) => handleDrop(e, "Doing")}>
          <div
            className="card"
            style={{
              backgroundColor: "#EBEBF0",
              borderRadius: "3px",
              maxHeight: "calc(100vh - 125px)",
            }}
          >
            <div className="card-body">
              <div className="sticky-body">
                <div className="d-flex justify-content-between w-100 align-items-center px-2">
                  <h5 className="card-title">Doing</h5>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </div>
              <div
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
              >
                {getData?.map(
                  (item, index) =>
                    item?.status === "Doing" && (
                      <div className="mt-2 card" key={index}>
                        <div
                          className="card-body"
                          draggable
                          onDragStart={(e) => handleDragStart(e, item?.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between mb-0">
                            <div className="d-flex gap-2">
                              <div
                                className="rounded-pill"
                                style={{
                                  width: "50px",
                                  height: "10px",
                                  backgroundColor: "#00C6EA",
                                }}
                              ></div>
                              <div
                                className="rounded-pill"
                                style={{
                                  width: "50px",
                                  height: "10px",
                                  backgroundColor: "#FF4CCC",
                                }}
                              ></div>
                            </div>
                            <div
                              onClick={() => {
                                setShowModal(true);
                                setIsCreated(false);
                                setSelectedCardId(item.id);
                                setModalType("delete");
                              }}
                            >
                              <i class="fs-56 text-danger fa-solid fa-trash-can"></i>
                            </div>
                          </div>
                          <div
                            style={{
                              width: "150px",
                              height: "10px",
                              backgroundColor: "#d1cbcb",
                            }}
                          ></div>
                          <p className="card-text fw-bold mb-0 mt-2">
                            {item?.title}
                          </p>
                          <p className="card-text" style={{textAlign:"justify"}}>
                            {showFullDescriptions[index]
                              ? item?.description
                              : truncateDescription(item?.description)}
                            {item?.description.split(" ").length > 10 && (
                              <span
                                className="text-primary"
                                onClick={() => toggleDescription(index)}
                              >
                                {showFullDescriptions[index]
                                  ? "Show less"
                                  : "Read more"}
                              </span>
                            )}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i
                                className="fa-regular fa-eye me-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setShowModal(true);
                                  setIsCreated(false);
                                  setSelectedCardId(item.id);
                                }}
                              ></i>
                              <i className="fa-solid fa-paperclip me-2"></i>
                              <span>2</span>
                            </div>
                            <div>
                              <img
                                src={users1}
                                className="me-1"
                                width="35px"
                                height="35px"
                                alt="profile"
                              />
                              <img
                                src={users2}
                                className=""
                                width="35px"
                                height="35px"
                                alt="profile"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col" onDragOver={(e) => handleDrop(e, "Done")}>
          <div
            className="card"
            style={{
              backgroundColor: "#EBEBF0",
              borderRadius: "3px",
              maxHeight: "calc(100vh - 125px)",
            }}
          >
            <div className="card-body">
              <div className="sticky-body">
                <div className="d-flex justify-content-between w-100 align-items-center px-2">
                  <h5 className="card-title">Done</h5>
                  <i className="fa-solid fa-ellipsis"></i>
                </div>
              </div>
              <div
                style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
              >
                {getData?.map(
                  (item, index) =>
                    item?.status === "Done" && (
                      <div className="mt-2 card" key={index}>
                        <div
                          className="card-body"
                          draggable
                          onDragStart={(e) => handleDragStart(e, item?.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex justify-content-between mb-0">
                            <div className="d-flex gap-2">
                              <div
                                className="rounded-pill"
                                style={{
                                  width: "50px",
                                  height: "10px",
                                  backgroundColor: "#00C6EA",
                                }}
                              ></div>
                              <div
                                className="rounded-pill"
                                style={{
                                  width: "50px",
                                  height: "10px",
                                  backgroundColor: "#FF4CCC",
                                }}
                              ></div>
                            </div>
                            <div
                              onClick={() => {
                                setShowModal(true);
                                setIsCreated(false);
                                setSelectedCardId(item.id);
                                setModalType("delete");
                              }}
                            >
                              <i class="fs-56 text-danger fa-solid fa-trash-can"></i>
                            </div>
                          </div>
                          <div
                            style={{
                              width: "150px",
                              height: "10px",
                              backgroundColor: "#d1cbcb",
                            }}
                          ></div>
                          <p className="card-text fw-bold mb-0 mt-2">
                            {item?.title}
                          </p>
                          <p className="card-text" style={{textAlign:"justify"}}>
                            {showFullDescriptions[index]
                              ? item?.description
                              : truncateDescription(item?.description)}
                            {item?.description.split(" ").length > 10 && (
                              <span
                                className="text-primary"
                                onClick={() => toggleDescription(index)}
                              >
                                {showFullDescriptions[index]
                                  ? "Show less"
                                  : "Read more"}
                              </span>
                            )}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i
                                className="fa-regular fa-eye me-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setShowModal(true);
                                  setIsCreated(false);
                                  setSelectedCardId(item.id);
                                }}
                              ></i>
                              <i className="fa-solid fa-paperclip me-2"></i>
                              <span>2</span>
                            </div>
                            <div>
                              <img
                                src={users1}
                                className="me-1"
                                width="35px"
                                height="35px"
                                alt="profile"
                              />
                              <img
                                src={users2}
                                className=""
                                width="35px"
                                height="35px"
                                alt="profile"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
