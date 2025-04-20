import React from "react";
import { useBooks } from "../../context/BookContext";

const Stats = () => {
  const { books } = useBooks();
  const reading = books.filter(b => b.status === "reading").length;
  const finished = books.filter(b => b.status === "finished").length;

  return (
    <div className="container">
      <h2>📈 Statistik Buku</h2>
      <p>Sedang Dibaca: {reading}</p>
      <p>Selesai Dibaca: {finished}</p>
      <p>Total Buku: {books.length}</p>
    </div>
  );
};

export default Stats;
