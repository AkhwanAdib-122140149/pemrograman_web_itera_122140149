import { useBooks } from "../context/BookContext";

const useBookStats = () => {
  const { books } = useBooks();

  const total = books.length;
  const reading = books.filter(book => book.status === "reading").length;
  const finished = books.filter(book => book.status === "finished").length;

  return { total, reading, finished };
};

export default useBookStats;