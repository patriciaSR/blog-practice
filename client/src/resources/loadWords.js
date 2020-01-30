import * as axios from 'axios';
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/';

async function loadWords() {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;

  const result = await axios.request({
    url: ENDPOINT + 'offensive-words',
    headers: {'Authorization': headerToken},
    method: 'get'
   })

   const lastWordsFirst = result.data.reverse();

  return lastWordsFirst
}


export default loadWords;
