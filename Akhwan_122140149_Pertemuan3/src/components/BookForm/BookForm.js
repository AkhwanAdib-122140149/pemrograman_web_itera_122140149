import React, { useState, useEffect } from "react";
import { useBooks } from "../../context/BookContext";

const BookForm = ({ editBook, setEditBook }) => {
  const { dispatch } = useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("reading");

  useEffect(() => {
    if (editBook) {
      setTitle(editBook.title);
      setAuthor(editBook.author);
      setStatus(editBook.status);
    }
  }, [editBook]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !author) return;

    if (editBook) {
      dispatch({
        type: "UPDATE_BOOK",
        payload: {
          id: editBook.id,
          updates: { title, author, status }
        }
      });
      setEditBook(null);
    } else {
      dispatch({
        type: "ADD_BOOK",
        payload: { title, author, status },
      });
    }

    setTitle("");
    setAuthor("");
    setStatus("reading");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="Judul Buku" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Penulis" value={author} onChange={e => setAuthor(e.target.value)} />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="reading">Sedang Dibaca</option>
        <option value="finished">Selesai Dibaca</option>
      </select>
      <button type="submit">{editBook ? "Update Buku" : "Tambah Buku"}</button>
      {editBook && (
        <button type="button" onClick={() => setEditBook(null)}>
          Batal Edit
        </button>
      )}
    </form>
  );
};

export default BookForm;