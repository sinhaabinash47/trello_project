import React from "react";
import users1 from "../assets/profile1.jpeg";
import users2 from "../assets/profile3.jpeg";

const Card = ({
  item,
  index,
  handleDragStart,
  toggleDescription,
  showFullDescriptions,
  setShowModal,
  setIsCreated,
  setSelectedCardId,
  setModalType,
}) => {
  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncated = words.slice(0, 10).join(" ");
    return truncated + (words.length > 10 ? "..." : "");
  };

  return (
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
            <i className="fs-56 text-danger fa-solid fa-trash-can"></i>
          </div>
        </div>
        <div
          style={{
            width: "150px",
            height: "10px",
            backgroundColor: "#d1cbcb",
          }}
        ></div>
        <p className="card-text fw-bold mb-0 mt-2">{item?.title}</p>
        <p className="card-text" style={{ textAlign: "justify" }}>
          {showFullDescriptions[index]
            ? item?.description
            : truncateDescription(item?.description)}
          {item?.description.split(" ").length > 10 && (
            <span
              className="text-primary"
              onClick={() => toggleDescription(index)}
            >
              {showFullDescriptions[index] ? "Show less" : "Read more"}
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
  );
};

export default Card;
