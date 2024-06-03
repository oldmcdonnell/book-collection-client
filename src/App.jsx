import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./authContext"
import { fetchUser, fetchSingle, updateBook, fetchAll } from "./api"
import Login from "./Login"
import CreateUser from "./CreateUser"
import UpdateBook from "./UpdateBook"
import CreateBook from "./CreateBook"
import axios from "axios"

const baseUrl = "http://127.0.0.1:8000"



const BookList = ({ books }) => {
  return books.length > 0 ? (
    <div>
      {books.map(book =>{
        return(
          <div key={book.id}><h4>{book.title} - {book.author} </h4>
          <p> {book.genre} </p> </div>
        )
      })}
    </div>
  ) : (
    <div> Loading…</div>
  )
}

function App() {
  const { auth } = useContext(AuthContext)
  const [books, setBooks] = useState([])

useEffect(()=> {
  if (auth.accessToken){
    fetchAll()
  }
}, [auth.accessToken])

  const getProfile = () => {
    fetchUser({ auth })
    
  }

  const getBooks = () => {
    fetchAll({ auth })
  }

//   const fetchAll = ({ auth }) => {
//     axios({
//         method: 'GET',
//         url: `${baseUrl}/get-books/`,
//         headers: {
//             Authorization: `Bearer ${auth.accessToken}`
//         },
//     }).then(response=> {
//         setBooks(response.data)
//         console.log('fetch book resposne', response)
//     }).catch(error => console.log('Book ERROR: ', error))
// }

  
  return (
    <div className="p-5">
      <h1>Home</h1>
      {/* <Login /> */}
      {/* <CreateUser /> */}
      <button onClick={()=> getProfile()}>Fetch profile</button>
      <button onClick={()=> getBooks()}>Show Books</button>
      <BookList books={books} />
      <CreateBook auth={auth} />
      <UpdateBook auth={auth} />
    </div>
  )
}


export default App