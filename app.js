const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors');

const repository = require('./repository/');

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());


app.post('/posts', async (req, res) => {
  const post = req.body;
  const { title, content, userID } = post;

  // Validation
  if (!(content && title && userID)) {
    res.sendStatus(400);
  } else {
    // Create object with needed fields and assign id
    await repository.posts.addPost(post);
    // Return new resource
    res.json(post);
  }
});

app.get('/posts', async (req, res) => {
  const allPosts = await repository.posts.getAllPosts();
  res.json(allPosts);
});

app.get('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.getPostById(id);
  if (!post) {
    res.sendStatus(404);
  } else {
    res.json(post);
  }
});

app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.deletePostById(id);
  if (!post) {
    res.sendStatus(404);
  } else {
    res.json(post);
  }
});

app.put('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await repository.posts.findPost(id);

  if (!post) {
    res.sendStatus(404);
  } else {
    const postReq = req.body;
    const { title, content, userID } = postReq;

    // Validation
    if (!(title && content && userID)) {
      res.sendStatus(400);
    } else {
      await repository.posts.updatePost(id, postReq);
      // Return new resource
      res.json(postReq);
    }
  }
});



async function main() {
  await repository.connect();

  app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
