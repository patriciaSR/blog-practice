import * as axios from 'axios'
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/'

async function sendEditComment(postID, comment) {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;
  const result = await axios.request({
    url: ENDPOINT + 'posts/' + postID + '/comments/' + comment.id,
    headers: {'Authorization': headerToken},
    data : { content: comment.content },
    method: 'put'
   })

  return result.data
}

export default sendEditComment
