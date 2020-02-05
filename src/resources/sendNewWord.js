import * as axios from 'axios'
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/'

async function sendNewWord(word) {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;
  const result = await axios.request({
    url: ENDPOINT + 'offensive-words',
    headers: {'Authorization': headerToken},
    data : word,
    method: 'post'
   })

  return result.data
}

export default sendNewWord
