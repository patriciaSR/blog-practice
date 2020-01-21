import * as axios from 'axios'

const ENDPOINT = 'https://localhost:3443/'

async function loadPosts() {
  const result = await axios.get(ENDPOINT + 'posts')

  let posts = []
  for (let post of result.data) {
    posts.push(post)
  }

  return posts
}

export default loadPosts
