import axios from "axios";
import { First } from "react-bootstrap/esm/PageItem";

const baseUrl = "http://127.0.0.1:8000"

export const createUser = ({ username, password, firstName, lastName }) => {
    axios({
        method:'post',
        url:`${baseUrl}/create-user/`,
        data:{
            username,
            password,
            first_name: firstName,
            last_name: lastName,
        }
    })
    .then(response =>{
        console.log('create user response ', response)
    })
    .catch(error => console.log('ERROR ', error))
}

export const getToken = ({ auth, username, password, firstName, lastName }) => {
    console.log('Getting to API, token called')
    axios.post(`${baseUrl}/token/`, {
        username,
        password,
    }).then(response => {
        console.log('Get response ', response)
        auth.setAccessToken(response.data.access)
    })
    .catch(error => {
        console.log('Error: ', error)
        auth.setAccessToken(undefined)
    })
}


export const fetchUser = ({ auth }) => {
    axios({
        method: 'get',
        url: `${baseUrl}/profile/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        }
    }).then(response=> {
        console.log('fetch user resposne', response)
    }).catch(error => console.log('ERROR: ', error))
}

export const fetchSingle = ({ auth }) => {
    axios({
        method: 'POST',
        url: `${baseUrl}/get-books/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            id: 2
        }
    }).then(response=> {
        console.log('fetch book resposne', response)
    }).catch(error => console.log('Book ERROR: ', error))
}


export const fetchAll = ({ auth }) => {
    axios({
        method: 'GET',
        url: `${baseUrl}/get-books/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
    }).then(response=> {

        console.log('fetch book resposne', response)
    }).catch(error => console.log('Book ERROR: ', error))
}

export const updateBook = ({ auth, bookId, newTitle, newAuthor, newGenre }) => {
    axios({
        method: 'PUT',
        url: `${baseUrl}/update-book/${bookId}/`,  // Include the book ID in the URL
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            title: newTitle,
            author: newAuthor,
            genre: newGenre
        }       
    }).then(response=> {
        console.log('fetch book response', response)
    }).catch(error => console.log('Edit ERROR: ', error))
}


export const createBookShelf = ({ auth, profile, bookshelf }) => {
    axios({
        method: 'PUT',
        url: `${baseUrl}/create-bookshelf/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            profile: profile,
            bookshelf: bookshelf
        }       
    }).then(response => {
        console.log('fetch bookshelf response', response);
        // Handle success response if needed
    }).catch(error => {
        console.log('Create Bookshelf Error:', error);
        // Handle error if needed
    });
}

export const addBook = ({ auth, title, author, genre }) => {
    axios({
        method: 'POST',  // Assuming you're creating a new book, so use POST instead of PUT
        url: `${baseUrl}/create-book/`,
        headers: {
            Authorization: `Bearer ${auth.accessToken}`
        },
        data: {
            title: title,
            author: author,
            genre: genre,
        }       
    }).then(response => {
        console.log('fetch bookshelf response', response);
        // Handle success response if needed
    }).catch(error => {
        console.log('Create Bookshelf Error:', error);
        // Handle error if needed
    });
}
