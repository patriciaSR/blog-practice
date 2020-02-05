import * as axios from 'axios'

const ENDPOINT = 'https://localhost:3443/'

async function login(username, password) {
  const auth = {
    username,
    password,
}
  const result = await axios.request({
    url: ENDPOINT + 'login',
    auth,
    method: 'post'
   })

  return result.data
}

export default login
