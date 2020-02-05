import * as axios from 'axios'

const ENDPOINT = 'https://localhost:3443/'

async function registNewUser(user) {
  const result = await axios.request({
    url: ENDPOINT + 'signup',
    data : user,
    method: 'post'
   })

  return result.data
}

export default registNewUser
