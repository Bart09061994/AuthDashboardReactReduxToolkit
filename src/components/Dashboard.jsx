import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import CreateCardModal from "./CreateCardModal";
import {  useEffect, useState } from "react";
import { addCard, deleteCard, loadCardsFromLocalStorage, modifyCard } from "../auth/cardSlice";
const cardStyle = {
  margin: "30px",
  border: "1.5px solid",
  borderRadius: "18px",
  boxShadow: "2px 4px 13px -2px rgba(0, 0, 0, 0.15)",
};

const imageStyle = {
  objectFit: "cover",
  borderRadius: "10px 10px 0 0",
};
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();
  const cards = useSelector((state) => state.card.cards);
const [isEditing, setIsEditing] = useState(false);
const [currentCardIndex, setCurrentCardIndex] = useState(null);

useEffect(() => {
  // Carica le cards dal localStorage quando il componente viene montato
  dispatch(loadCardsFromLocalStorage());
}, [dispatch]);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  const handleAddCard = (newCard) => {
    dispatch(addCard(newCard));
    setShowModal(false);
  };

const handleSaveModifyCard = (updatedCard) => {
  dispatch(modifyCard({ index: currentCardIndex, updatedCard }));
  setShowModal(false);
};

   const handleModify = (index) => {
     setCurrentCardIndex(index);
     setIsEditing(true);
     setShowModal(true);
   };

  const handleDelete = (index) => {
    dispatch(deleteCard(index));
  };

  const handleDetail = (index) => {
    navigate(`/detail/${index}`);
  };

  const handleOpenAddModal = () => {
    setCurrentCardIndex(null);
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={6} className="text-center">
            <h2 className="mb-4">Dashboard</h2>
            <Button variant="primary" onClick={handleOpenAddModal}>
              Aggiungi Card
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 gx-4">
          <Col xs={12}>
            <Card style={cardStyle}>
              <Card.Body>
                <h2 className="text-center">I miei Negozi</h2>
                {cards.length === 0 ? (
                  <p className="text-center">Nessuna card disponibile</p>
                ) : (
                  <Row>
                    {cards.map((card, index) => (
                      <Col key={index} xs={12} sm={6} lg={4}>
                        <Card style={cardStyle} className="mb-3">
                          <div
                            style={{
                              position: "relative",
                              overflow: "hidden",
                            }}>
                            <Card.Img
                              variant="top"
                              src={
                                card.image || "https://placehold.co/1200x1080"
                              }
                              alt="Card image"
                              style={imageStyle}
                            />
                            {card.type && (
                              <span
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                  background: "#d32f2f",
                                  color: "#ffffff",
                                  borderRadius: 5,
                                  padding: "2px 8px",
                                }}>
                                {card.type}
                              </span>
                            )}
                          </div>
                          <Card.Body className="d-flex flex-column">
                            <Card.Title className="text-truncate">
                              {card.title}
                            </Card.Title>
                            <Card.Text>Nome:{card.name}</Card.Text>
                            <Card.Text>
                              Descrizione:{card.description}
                            </Card.Text>
                            <Card.Text>Prezzo: {card.price} €</Card.Text>
                            <div className="mt-auto d-flex justify-content-between">
                              <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => handleDetail(index)}>
                                Accedi
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDelete(index)}
                                className="me-2">
                                Elimina
                              </Button>
                              <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => handleModify(index)}>
                                Modifica
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <CreateCardModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={isEditing ? handleSaveModifyCard : handleAddCard}
          card={isEditing ? cards[currentCardIndex] : null}
          // show={showModal}
          // handleClose={handleCloseModal}
          // handleAddCard={handleAddCard}
        />
      </Container>
      <Button variant="danger" onClick={handleLogout} className="mt-3">
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
