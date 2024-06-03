import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { AuthContext } from "./authContext"
import { createUser, getToken } from "./api"
import CreateUser from "./CreateUser"

function Login() {
  const { auth } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(()=> {
    if (auth.accessToken){
      navigate('/')
    }
  },[navigate, auth.accessToken])

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
      <CreateUser />
      </>
  )
}


export default Login