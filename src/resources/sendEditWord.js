import * as axios from 'axios'
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/'

async function sendEditWord(wordToChange, newWord) {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;
  const result = await axios.request({
    url: ENDPOINT + 'offensive-words/' + wordToChange,
    headers: {'Authorization': headerToken},
    data : { word: newWord.word, level: newWord.level },
    method: 'put'
   })

  return result.data
}

export default sendEditWord
