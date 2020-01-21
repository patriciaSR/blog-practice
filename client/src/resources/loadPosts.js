import * as axios from 'axios'
const https = require('https')


const ENDPOINT = 'https://localhost:3443/'

const agent = new https.Agent({
  rejectUnauthorized: false
})

async function loadPosts() {
  const result = await axios.get(ENDPOINT + 'posts', {httpsAgent: agent})

  let posts = []
  for (let post of result.data) {
    posts.push(post)
  }

  return posts
}

export default loadPosts
