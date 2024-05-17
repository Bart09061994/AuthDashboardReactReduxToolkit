// cardSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Funzione per caricare le card dal localStorage
const loadCards = () => {
  try {
    const serializedCards = localStorage.getItem("cards");
    if (serializedCards === null) {
      return [];
    }
    return JSON.parse(serializedCards);
  } catch (err) {
    console.error("Failed to load cards from localStorage", err);
    return [];
  }
};

// Funzione per salvare le card nel localStorage
const saveCards = (cards) => {
  try {
    const serializedCards = JSON.stringify(cards);
    localStorage.setItem("cards", serializedCards);
  } catch (err) {
    console.error("Failed to save cards to localStorage", err);
  }
};

const initialState = {
  cards: loadCards(),
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload);
      saveCards(state.cards); // Salva le card nel localStorage dopo l'aggiunta
    },
    deleteCard: (state, action) => {
      state.cards.splice(action.payload, 1);
      saveCards(state.cards); // Salva le card nel localStorage dopo l'eliminazione
    },
    modifyCard: (state, action) => {
      const { index, updatedCard } = action.payload;
      state.cards[index] = updatedCard;
      saveCards(state.cards); // Salva le card nel localStorage dopo la modifica
    },
    loadCardsFromLocalStorage: (state) => {
      state.cards = loadCards(); // Carica le card dal localStorage
    },
  },
});

export const { addCard, deleteCard, modifyCard, loadCardsFromLocalStorage } = cardSlice.actions;

export default cardSlice.reducer;
