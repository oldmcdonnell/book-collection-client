import { useContext } from "react"
import { AuthContext } from "./authContext"
import { fetchAll, fetchUser, fetchSingle, updateBook } from "./api"
import Login from "./Login"
import CreateUser from "./CreateUser"
import UpdateBook from "./UpdateBook"

function App() {
  const { auth } = useContext(AuthContext)

  const getProfile = () => {
    fetchUser({ auth })
    
  }
  const getOneBook = () => {
    fetchSingle({ auth })
  }

  const getBooks = () => {
    fetchAll({ auth })
  }
  const getUpdate = () => {
    updateBook({ auth })
  }
  

  return (
    <div className="p-5">
      <h1>Home</h1>
      {/* <Login /> */}
      <CreateUser />
      <button onClick={()=> getProfile()}>Fetch profile</button>
      <button onClick={()=> getOneBook()}>Show single </button>
      <button onClick={()=> getBooks()}>Show Books</button>
      <button onClick={()=> getUpdate()}>Update Book</button>
      <UpdateBook auth={ auth }/>
    </div>
  )
}


export default App