import React, { useState } from "react";
import Card from "./Card";

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

  const columns = [
    { title: "To Do", status: "Todo" },
    { title: "Doing", status: "Doing" },
    { title: "Done", status: "Done" },
  ];

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

  const toggleDescription = (index) => {
    setShowFullDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    toggleRefresh();
  };

  return (
    <div>
      <div className="row m-0">
        {columns.map((column, columnIndex) => (
          <div
            className="col"
            key={columnIndex}
            onDragOver={(e) => handleDrop(e, column.status)}
          >
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
                    <h5 className="card-title">{column.title}</h5>
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 200px)",
                  }}
                >
                  {getData?.map(
                    (item, index) =>
                      item?.status === column.status && (
                        <Card
                          key={index}
                          item={item}
                          index={index}
                          handleDragStart={handleDragStart}
                          toggleDescription={toggleDescription}
                          showFullDescriptions={showFullDescriptions}
                          setShowModal={setShowModal}
                          setIsCreated={setIsCreated}
                          setSelectedCardId={setSelectedCardId}
                          setModalType={setModalType}
                        />
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
