import React, { useState, useEffect } from "react";
import { useBooks } from "../../context/BookContext";

const BookForm = ({ editBook, setEditBook }) => {
  const { dispatch } = useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("reading");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editBook) {
      setTitle(editBook.title);
      setAuthor(editBook.author);
      setStatus(editBook.status);
      setErrors({});
    }
  }, [editBook]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Judul buku harus diisi!";
    }
    if (!author.trim()) {
      newErrors.author = "Nama penulis harus diisi!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div style={{ marginBottom: '1rem' }}>
        <input 
          placeholder="Judul Buku" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          style={{ borderColor: errors.title ? 'red' : '#ccc' }}
        />
        {errors.title && <span className="error-message" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.title}</span>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input 
          placeholder="Penulis" 
          value={author} 
          onChange={e => setAuthor(e.target.value)}
          style={{ borderColor: errors.author ? 'red' : '#ccc' }}
        />
        {errors.author && <span className="error-message" style={{ color: 'red', fontSize: '0.8rem' }}>{errors.author}</span>}
      </div>

      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="reading">Sedang Dibaca</option>
        <option value="finished">Selesai Dibaca</option>
      </select>

      <button type="submit">{editBook ? "Update Buku" : "Tambah Buku"}</button>
      {editBook && (
        <button type="button" onClick={() => {
          setEditBook(null);
          setErrors({});
        }}>
          Batal Edit
        </button>
      )}
    </form>
  );
};

export default BookForm;
