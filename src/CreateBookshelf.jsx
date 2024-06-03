import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { createBookShelf } from "./api";

const CreateBookshelf = ({ auth }) => {
    const { user } = useContext(AuthContext);
    const [response, setResponse] = useState(null);

    const handleSubmit = () => {
        if (user && user.profile && user.profile.id) {
            createBookShelf({ auth, profile: user.profile.id })
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
        <div className="p-5">
            <h1>Create Bookshelf</h1>
            <div>
                <p>Profile ID (Auto): {user && user.profile && user.profile.id}</p>
            </div>
            <div style={{ marginTop: 20 }}>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            {response && (
                <div>
                    <h2>Bookshelf Created</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CreateBookshelf;