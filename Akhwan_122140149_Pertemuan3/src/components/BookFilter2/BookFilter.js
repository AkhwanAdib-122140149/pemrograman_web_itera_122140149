import React, { useState } from "react";
import { useBooks } from "../../context/BookContext";

const BookFilter = ({ setFilteredBooks }) => {
  const { books } = useBooks();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const handleFilter = () => {
    let filtered = books;

    if (search.trim() !== "") {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      filtered = filtered.filter(book => book.status === status);
    }

    setFilteredBooks(filtered);
  };

  React.useEffect(() => {
    handleFilter();
  }, [search, status, books]);

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Cari judul..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="all">Semua</option>
        <option value="reading">Sedang Dibaca</option>
        <option value="finished">Selesai Dibaca</option>
      </select>
    </div>
  );
};

export default BookFilter;