import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { addBookToShelf } from "./api";

const AddToShelf = ({ auth }) => {
    const { user } = useContext(AuthContext);
    const [response, setResponse] = useState(null);

    const handleSubmit = () => {
        if (user.profile.bookshelf){
            addBookToShelf({ auth, profile: user.profile.id, bookshelf: user.profile.bookshelf })
            .then(data => {
                setResponse(data);
            })
            .catch(error => {
                console.error('Create Bookshelf ERROR: ', error);
                setResponse(null);
            });
        } else {
            console.error('User profile ID not available.');
        }
    };

    return (
        <div>
            <button onClick={handleSubmit}>Add to Bookshelf</button>
            {response && <p>{response.message}</p>}
        </div>
    );
};

export default AddToShelf;
