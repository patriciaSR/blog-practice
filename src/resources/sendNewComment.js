import * as axios from 'axios'
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/'

async function sendNewComment(postID, comment) {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;
  const result = await axios.request({
    url: ENDPOINT + 'posts/' + postID + '/comments',
    headers: {'Authorization': headerToken},
    data : {content: comment},
    method: 'post'
   })

  return result.data
}

export default sendNewComment
