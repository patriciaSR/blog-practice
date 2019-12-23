const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors');

const url = 'mongodb://localhost:27017/blogDB';

const app = express();
// Enable CORS
app.use(cors());
// Convert json bodies to JavaScript object
app.use(express.json());

// Save info of collections DataBase Mongo
let posts;
let users;
let comments;
let roles;

app.post('/posts', async (req, res) => {
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
  const allPosts = await posts.find().toArray();
  res.json(allPosts);
});

app.get('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await posts.find({ _id: new ObjectId(id) }).toArray();
  if (!post) {
    res.sendStatus(404);
  } else {
    res.json(post);
  }
});

app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id;
  const post = await posts.deleteOne({ _id: new ObjectId(id) });
  if (!post) {
    res.sendStatus(404);
  } else {
    res.json(post);
  }
});

app.put('/posts/:id', async (req, res) => {
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

async function dbConnect() {
  const conn = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Connected to Mongo");

  posts = conn.db().collection('posts');
  users = conn.db().collection('users');
  comments = conn.db().collection('comments');
  roles = conn.db().collection('roles');
}

async function main() {
  await dbConnect();

  app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
