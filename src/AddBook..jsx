import React, { useState } from "react";
import { addBook } from "./api";

const AddBook = ({ auth, onBookAdded }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");

    const handleSubmit = () => {
        addBook({ auth, title, author, genre })
            .then((data) => {
                onBookAdded(data); // Call the onBookAdded function to update the book list
                setTitle("");
                setAuthor("");
                setGenre("");
            })
            .catch((error) => console.error("Add Book Error:", error));
    };

    return (
        <div>
            <h2>Add Book</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
};

export default AddBook;