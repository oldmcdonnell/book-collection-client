import React, { useState } from 'react';
import axios from 'axios';
import { addBook } from './api';

const baseUrl = "http://127.0.0.1:8000";

function AddBook({ auth, onBookAdded }) {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    const handleAddBook = () => {
        addBook({ auth, title, author, genre })
            .then(newBook => {
                onBookAdded(newBook);  // Notify parent component about the new book
                setShowForm(false);  // Hide the form after adding the book
                setTitle('');
                setAuthor('');
                setGenre('');
            })
            .catch(error => {
                console.log('Add Book Error:', error);
            });
    };

    return (
        <div>
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add Book'}
            </button>
            {showForm && (
                <div>
                    <div>
                        <div>Title:</div>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div>
                        <div>Author:</div>
                        <input
                            onChange={e => setAuthor(e.target.value)}
                            value={author}
                        />
                    </div>
                    <div>
                        <div>Genre:</div>
                        <input
                            onChange={e => setGenre(e.target.value)}
                            value={genre}
                        />
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <button onClick={handleAddBook}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddBook;