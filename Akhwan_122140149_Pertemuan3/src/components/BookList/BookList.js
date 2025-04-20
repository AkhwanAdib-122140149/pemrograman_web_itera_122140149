import React from "react";
import { useBooks } from "../../context/BookContext";

const BookList = ({ filteredBooks, onEdit }) => {
  const { books, dispatch } = useBooks();
  const sourceBooks = filteredBooks || books;

  const toggleStatus = (book) => {
    dispatch({
      type: "UPDATE_BOOK",
      payload: {
        id: book.id,
        updates: {
          status: book.status === "reading" ? "finished" : "reading",
        },
      },
    });
  };

  const deleteBook = (id) => {
    dispatch({ type: "DELETE_BOOK", payload: id });
  };

  const handleEdit = (book) => {
    onEdit(book);
  };

  const filtered = {
    reading: sourceBooks.filter((book) => book.status === "reading"),
    finished: sourceBooks.filter((book) => book.status === "finished"),
  };

  return (
    <div className="book-lists">
      <div className="book-section">
        <h3>Sedang Dibaca</h3>
        {filtered.reading.length > 0 ? (
          filtered.reading.map(book => (
            <BookCard
              key={book.id}
              book={book}
              toggleStatus={toggleStatus}
              deleteBook={deleteBook}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>Tidak ada buku yang sedang dibaca.</p>
        )}
      </div>
  
      <div className="book-section">
        <h3>Selesai Dibaca</h3>
        {filtered.finished.length > 0 ? (
          filtered.finished.map(book => (
            <BookCard
              key={book.id}
              book={book}
              toggleStatus={toggleStatus}
              deleteBook={deleteBook}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>Belum ada buku yang selesai dibaca.</p>
        )}
      </div>
    </div>
  );
};

const BookCard = ({ book, toggleStatus, deleteBook, onEdit }) => (
  <div className="book-card">
    <h4>{book.title}</h4>
    <p>{book.author}</p>
    <button onClick={() => toggleStatus(book)}>
      Tandai {book.status === "reading" ? "Selesai" : "Sedang Dibaca"}
    </button>
    <button onClick={() => onEdit(book)} className="edit-btn">
      Edit
    </button>
    <button onClick={() => deleteBook(book.id)} className="delete-btn">
      Hapus
    </button>
  </div>
);

export default BookList;
