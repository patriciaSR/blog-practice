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

  if (!firstname || !username || !email || !password) {
    res.status(400).json('faltan datos');
  } else {
    const findUser = await repository.users.findUser(username, email);

    if (!findUser) {
      newUser.role = 'publisher';
      await repository.users.addUser(newUser);
      delete newUser.passwordHash;
      res.status(200).json({ message: 'Usuario registrado correctamente', newUser });
    } else if (findUser.username === username) {
      res.status(400).send('Ese nombre de usuario ya existe');
    } else {
      res.status(400).send('Ese email ya existe');
    }
  }
});

module.exports = signupRouter;
