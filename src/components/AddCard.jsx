import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

function AddCard({
  toggleRefresh,
  showModal,
  setShowModal,
  handleClose,
  handleShow,
  isCreated,
  setIsCreated,
  selectedCardId,
}) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      if (/^[A-Za-z\s]*$/.test(value)) {
        setTitle(value);
      }
    } else if (name === "description") {
      setDescription(value);
      if (value.length > 25) {
        setErrorMessage("Description must be 25 characters or less.");
      } else {
        setErrorMessage("");
      }
    } else if (name === "status") {
      setStatus(value);
    }
  };
  

  const handleCardData = (event) => {
    event.preventDefault();
    if (isCreated) {
      console.log("Form submitted");
      if (!title || !description || !status) {
        setErrorMessage("All fields are required.");
        return;
      }
      const existingCards = JSON.parse(localStorage.getItem("cards")) || [];
      const newCard = {
        id: new Date().getTime(),
        title: title,
        description: description,
        status: status,
      };
      const updatedCards = [...existingCards, newCard];
      localStorage.setItem("cards", JSON.stringify(updatedCards));
      resetForm();
      setShowModal(false);
      setIsCreated(true);
      toggleRefresh();
    } else {
      if (!title || !description || !status) {
        setErrorMessage("All fields are required.");
        return;
      }
      const existingCards = JSON.parse(localStorage.getItem("cards")) || [];
      const updatedCardData = existingCards?.map((item) => {
        if (item?.id === selectedCardId) {
          return {
            ...item,
            title: title,
            description: description,
            status: status,
          };
        } else return item;
      });
      localStorage.setItem("cards", JSON.stringify(updatedCardData));
      resetForm();
      setShowModal(false);
      setIsCreated(true);
      toggleRefresh();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("");
  };

  useEffect(() => {
    if (!isCreated) {
      const getData = localStorage.getItem("cards");
      const getParseData = JSON.parse(getData);
      const filterData = getParseData?.find(
        (item) => item?.id === selectedCardId
      );
      setTitle(filterData?.title);
      setDescription(filterData?.description);
      setStatus(filterData?.status);
      setShowDeleteButton(true);
    } else {
      resetForm();
      setShowDeleteButton(false);
    }
  }, [isCreated]);

  const handleCardDelete = () => {
    const cardDelete = JSON.parse(localStorage.getItem("cards")) || [];
    const afterDelete = cardDelete?.filter(
      (item) => item.id !== selectedCardId
    );
    localStorage.setItem("cards", JSON.stringify(afterDelete));
    resetForm();
    setShowModal(false);
    setIsCreated(true);
    toggleRefresh();
    console.log(afterDelete, "existingCards");
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isCreated ? "Add New Card" : "Update Card"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={title}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="title"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleInputChange}
                required
              />
            </div>
            <select
              name="status"
              onChange={handleInputChange}
              value={status}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="" selected>Select</option>
              <option value="Todo">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </form>
          <div className="mt-2">
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <div>
              {showDeleteButton && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCardDelete}
                >
                  Delete
                </button>
              )}
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setIsCreated(true);
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCardData}
              >
                {isCreated ? "Save" : "Update"}
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCard;
