import * as axios from 'axios';

const ENDPOINT = 'https://localhost:3443/';

async function loadPosts() {
  const result = await axios.get(ENDPOINT + 'posts');

  const lastPostsFirst = result.data.reverse();

  return lastPostsFirst;
}

export default loadPosts;
