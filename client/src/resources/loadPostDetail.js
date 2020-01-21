import * as axios from 'axios'

const ENDPOINT = 'https://localhost:3443/'

async function loadPostDetail(id) {
  const result = await axios.get(ENDPOINT + 'posts/' + id)

  return result.data
}

export default loadPostDetail
