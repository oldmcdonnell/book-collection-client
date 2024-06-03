import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchAllBooks } from './api'; // Import the fetchAllBooks function
import AddToShelf from "./AddToShelf"; // Import the AddToShelf component

const baseUrl = "http://127.0.0.1:8000";

function BookList({ auth, onSelectBook }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchAllBooks({ auth })
            .then(data => {
                setBooks(data);  // Update the state with the fetched data
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, [auth]);
    
    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <span>{book.title}</span>
                        <button onClick={() => onSelectBook(book)}>Update</button>
                        <button onClick={() => {
                            axios({
                                method: 'DELETE',
                                url: `${baseUrl}/get-books/`,
                                headers: {
                                    Authorization: `Bearer ${auth.accessToken}`
                                },
                                data: {
                                    id: book.id
                                }
                            }).then(response => {
                                console.log('Delete book response', response);
                                setBooks(books.filter(b => b.id !== book.id));
                            }).catch(error => console.log('Delete Book ERROR: ', error));
                        }}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Add the AddToShelf component here */}
            <AddToShelf auth={auth} />
        </div>
    );
}

export default BookList;