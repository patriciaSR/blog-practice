const express = require('express');

const signupRouter = express.Router();

const repository = require('../repository');


signupRouter.post('/', async (req, res) => {
  const newUser = req.body;
  const {
    firstname,
    lastname,
    username,
    email,
    image,
    password,
  } = newUser;

  if (!firstname && !username && !email && !password) {
    res.sendStatus(400);
  } else if (await repository.users.findUser(username, email)) {
    res.status(400).send('Ese usuario ya existe');
  } else {
    await repository.users.addUser(newUser);
    delete newUser.passwordHash;
    res.status(200).json({ message: 'Usuario registrado correctamente', newUser });
  }
});

module.exports = signupRouter;
