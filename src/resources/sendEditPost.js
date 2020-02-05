import * as axios from 'axios'
import userStore from '../stores/user'

const ENDPOINT = 'https://localhost:3443/'

async function sendEditPost(editPost, postID) {
  const userToken = userStore.state.token;

  const headerToken =`Bearer ${userToken}`;
  const result = await axios.request({
    url: ENDPOINT + 'posts/' + postID,
    headers: {'Authorization': headerToken},
    data : editPost,
    method: 'put'
   })

  return result.data
}

export default sendEditPost
