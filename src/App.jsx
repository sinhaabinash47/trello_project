import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { TrelloLayouts } from "./components/TrelloLayouts.jsx";
import AddCard from "./components/AddCard.jsx";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false)
    setSelectedCardId(0)
    setIsCreated(true)
    console.log("asdadasasd");
  };
  const handleShow = () => setShowModal(true);
  const [isCreated, setIsCreated] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState(0);
  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <>
      <div>
        <Navbar setShowModal={setShowModal} setIsCreated={setIsCreated} />
        <TrelloLayouts toggleRefresh={toggleRefresh} setSelectedCardId={setSelectedCardId} refresh={refresh} setShowModal={setShowModal} setIsCreated={setIsCreated}/>
        <AddCard
          showModal={showModal}
          setShowModal={setShowModal}
          handleClose={handleClose}
          handleShow={handleShow}
          toggleRefresh={toggleRefresh}
          isCreated={isCreated}
          setIsCreated={setIsCreated}
          selectedCardId={selectedCardId}
        />
      </div>
    </>
  );
}

export default App;
