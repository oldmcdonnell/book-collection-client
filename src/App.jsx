import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { fetchUser, fetchAllBooks } from "./api";
import AddBook from "./AddBook"; // Import the AddBook component
import BookList from "./BookList";
import UpdateBook from "./UpdateBook";
import AddToShelf from "./AddToShelf";
import CreateBookshelf from "./CreateBookshelf";



function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
      if (auth.accessToken) {
          fetchAllBooks({ auth })
              .then(data => setBooks(data))
              .catch(error => console.error('Error fetching books:', error));
      }
  }, [auth.accessToken]);

  const getProfile = () => {
      fetchUser({ auth });
  };

  const handleBookAdded = (newBook) => {
      setBooks([...books, newBook]);
  };

  const handleSelectBook = (book) => {
      setSelectedBook(book);
  };

  return (
      <div className="p-5">
          <h1>Home</h1>
          <button onClick={getProfile}>Fetch profile</button>
          <h1>Book Collection</h1>
          <AddBook auth={auth} onBookAdded={handleBookAdded} />
          <AddToShelf auth={auth} />
          <CreateBookshelf auth={auth} /> {/* Add the CreateBookShelf component here */}
          <BookList auth={auth} books={books} onSelectBook={handleSelectBook} />
          {selectedBook && <UpdateBook auth={auth} book={selectedBook} />}
      </div>
  );
}

export default App;

