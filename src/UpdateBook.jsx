import { useContext, useState } from "react"
import { createUser, getToken } from "./api"
import axios from "axios"

const baseUrl = "http://127.0.0.1:8000"

function UpdateBook({ auth }) {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')

    const submit = () => {
        axios({
            method: 'PUT',
            url: `${baseUrl}/get-books/`,
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            },
            data: {
                id: id,
                title: title,
                author: author,
                genre: genre
            }
        }).then(response=> {
            console.log('fetch book resposne', response)
        }).catch(error => console.log('Book ERROR: ', error))
      }

    return (
        <div className="p-5">
          <h1>Update Book</h1>
          <div>
            <div>ID:</div>
            <input
              onChange={e => setId(e.target.value)}
              value={id}
            />
          </div>
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
            <button onClick={() => submit()}>Submit</button>
          </div>
    
        </div>
      )
}

export default UpdateBook