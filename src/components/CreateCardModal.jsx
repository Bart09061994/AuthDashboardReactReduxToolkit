import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const CreateCardModal = ({ show, handleClose, handleSave, card }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

   useEffect(() => {
     if (card) {
       setName(card.name);
       setDescription(card.description);
       setPrice(card.price);
       setImage(card.image);
     } else if (show) {
       // Resetta gli stati solo se la modale è aperta per aggiungere una nuova card
       setName("");
       setDescription("");
       setPrice("");
       setImage(null);
     }
   }, [card, show]);


  const handleSubmit = () => {
    const newCard = {
      name,
      description,
      price,
      image: image || "https://placehold.co/1200x1080",
    };

    if (card) {
      // Se card esiste, significa che stiamo modificando una card esistente
      const updatedCard = {
        ...card,
        ...newCard,
      };
      handleSave(updatedCard);
    } else {
      // Se card non esiste, stiamo aggiungendo una nuova card
      handleSave(newCard);
    }
    handleClose();
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{card ? "Modifica Card" : "Aggiungi Card"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Inserisci la descrizione"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Prezzo</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci il prezzo"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Immagine</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {card ? "Salva Modifiche" : "Aggiungi"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CreateCardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  card: PropTypes.object,
};

export default CreateCardModal;
