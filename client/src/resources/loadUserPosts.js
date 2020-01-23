import * as axios from 'axios';

const ENDPOINT = 'https://localhost:3443/';

async function loadUserPosts(userID) {
  const result = await axios.get(ENDPOINT + 'posts/' + 'user/' + userID);

  const lastPostsFirst = result.data.reverse();

  return lastPostsFirst;
}

export default loadUserPosts;
