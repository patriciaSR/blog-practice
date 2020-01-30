import * as axios from 'axios'
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/'

async function sendNewPost(user) {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;
  const result = await axios.request({
    url: ENDPOINT + 'posts',
    headers: {'Authorization': headerToken},
    data : user,
    method: 'post'
   })

  return result.data
}

export default sendNewPost
