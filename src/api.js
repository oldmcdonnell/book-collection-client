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