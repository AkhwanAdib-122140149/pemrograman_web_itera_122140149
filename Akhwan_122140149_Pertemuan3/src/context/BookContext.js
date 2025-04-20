import React, { createContext, useContext, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookContext = createContext();

const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, { ...action.payload, id: Date.now() }];
    case "DELETE_BOOK":
      return state.filter(book => book.id !== action.payload);
    case "UPDATE_BOOK":
      return state.map(book =>
        book.id === action.payload.id ? { ...book, ...action.payload.updates } : book
      );
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [storedBooks, setStoredBooks] = useLocalStorage("books", []);
  const [books, dispatch] = useReducer(bookReducer, storedBooks);

  React.useEffect(() => {
    setStoredBooks(books);
  }, [books]);

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
