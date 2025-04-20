import React, { useState } from "react";
import BookForm from "../../components/BookForm/BookForm";
import BookList from "../../components/BookList/BookList";
import BookFilter from "../../components/BookFilter2/BookFilter";

const Home = () => {
  const [filteredBooks, setFilteredBooks] = useState(null);
  const [editBook, setEditBook] = useState(null);

  const handleEdit = (book) => {
    setEditBook(book);
  };

  return (
    <div className="container">
      <div className="section input-section">
        <h2>Input Buku</h2>
        <BookForm editBook={editBook} setEditBook={setEditBook} />
      </div>
      
      <div className="section list-section">
        <h2>Daftar Buku</h2>
        <BookFilter setFilteredBooks={setFilteredBooks} />
        <BookList filteredBooks={filteredBooks} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Home;