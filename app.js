const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors');

const repository = require('./repository.js');

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());


app.post('/posts', async (req, res) => {
  const posts = repository.getCollection('posts');
  const post = req.body;
  const { title, content, date, tags, categories, image, userID } = post;

  // Validation
  if (!(content && title && userID)) {
    res.sendStatus(400);
  } else {
    // Create object with needed fields and assign id
    const newPost = {
      title,
      content,
      date,
      tags,
      categories,
      image,
      userID,
    };
    // Save resource
    await posts.insertOne(newPost);
    // Return new resource
    res.json(newPost);
  }
});

app.get('/posts', async (req, res) => {
  const posts = repository.getCollection('posts');
  const allPosts = await posts.find().toArray();
  res.json(allPosts);
});

app.get('/posts/:id', async (req, res) => {
  const posts = repository.getCollection('posts');
  const id = req.params.id;
  const post = await posts.find({ _id: new ObjectId(id) }).toArray();
  if (!post) {
    res.sendStatus(404);
  } else {
    res.json(post);
  }
});

app.delete('/posts/:id', async (req, res) => {
  const posts = repository.getCollection('posts');
  const id = req.params.id;
  const post = await posts.deleteOne({ _id: new ObjectId(id) });
  if (!post) {
    res.sendStatus(404);
  } else {
    res.json(post);
  }
});

app.put('/posts/:id', async (req, res) => {
  const posts = repository.getCollection('posts');
  const id = req.params.id;
  const post = await posts.findOne({ _id: new ObjectId(id) });
  if (!post) {
    res.sendStatus(404);
  } else {
    const postReq = req.body;
    const { title, content, date, tags, categories, image, userID } = postReq;

    // Validation
    if (!(title && content && userID)) {
      res.sendStatus(400);
    } else {
      const newPost = {
        title,
        content,
        date,
        tags,
        categories,
        image,
        userID,
      };

      // Create object with needed fields and assign id
      posts.updateOne({ _id: new ObjectId(id) }, { $set: newPost });
      // Return new resource
      res.json(newPost);
    }
  }
});



async function main() {
  await repository.connect();

  app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
