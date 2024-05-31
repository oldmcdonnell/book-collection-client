import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./authContext"
import { createUser, getToken } from "./api"
import CreateBook from "./CreateBook"

function Login() {
  const { auth } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    getToken({ auth, username, password})
  }

  return (
    <>
    <div className="p-5">
      <h1>Login</h1>
      <div>
        <div>Username</div>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
      <div>Password</div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button onClick={() => submit()}>Submit</button>
      </div>
      <hr/>
      <CreateBook />
      {/* <CreateUser /> */}
      </>
  )
}


export default Login