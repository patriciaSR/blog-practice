import * as axios from 'axios'
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/'

async function deleteWord(word) {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;
  const result = await axios.request({
    url: ENDPOINT + 'offensive-words/' + word,
    headers: {'Authorization': headerToken},
    method: 'delete'
   })

  return result.data
}

export default deleteWord
