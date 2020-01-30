# Blog Vue Client

## Functionalities
The information entities that the blog should manage are:

- **Post**: Each entry contains the following fields: Author's name, Author's nickname, Title, Text, List of comments.
- **Comment**: Each comment contains the following fields: Nickname of the author of the comment, Content, Date of the comment.
- **OffensiveWord**: Each word will have an associated "level" field indicating the severity of the word from 1 to 5.

## Views

## User control

The application has to allow several roles of users:

- _Authenticated_:
  - **Admin**: Admin users can perform any operation of the REST API.
  - **Publisher**: Publisher users can:
    - Create blog entries.
    - Delete and modify only the entries created by them.
    - Delete comments from your posts.
    - Add comments to other posts.
- _No-Authenticated_: They can consult information but cannot add comments or posts.

Any user can register in the application and will be assigned the role of “publisher”.
To do this, a user creation endpoint will be created. --> `/signup`

The app implement a Node.js script called defaultUsers.js that will connect to MongoDB and create admin and publisher users when it runs the first time.


## Client's Structure:

```
├── /client (client folder)
│    │
│    ├── /public ()
│    │   └── index.html (html structure)
│    │
│    ├── /src (src folder)
│    │   ├── /assets(image files)
│    │   ├── /components
│    │   ├── /plugins(vuetify config)
│    │   ├── /resources(AJAX requests)
│    │   ├── /router(router vue config)
│    │   ├── /stores(login data user management)
│    │   └── /views(app views)
│    │   
│    ├── App.vue
│    ├── main.js
│    │   
│    ├── /tests(cypress E2E tests)
│    │   
│    ├── .editorconfig
│    ├── .gitignore
│    ├── babel.config.js
│    ├── cypress.json
│    ├── package.json
     └──vue.config.js
```


## Install Dependencies

You can install all dependencies in `package.json` file on one step using:

`npm install`

Or you can install install separately one by one:

Install **[Node.js](https://nodejs.org/es/)**:

`npm install -g node`

Install **[Express.js](https://expressjs.com/)** for building REST APIs:

`npm install express`

Install **[MongoDB](https://www.mongodb.com/)** for buildig Non-Relational(NoSQL) Database:

`npm install mongodb`

Install **[CORS](https://www.npmjs.com/package/cors)** node.js package for providing a Connect/Express middleware that can be used to enable CORS:

`npm install cors`

Install **[bcrypt](https://www.npmjs.com/package/bcrypt)** for passwords hash encryption:

`npm install bcrypt`

Install **[fs](https://nodejs.org/api/fs.html)** for file system operation in node:

`npm install fs`

Install **[https](https://www.npmjs.com/package/https)** for run node server in a safe port with a SSL certificate:

`npm install https`

Install **[passport](http://www.passportjs.org/)** for authentication config:

`npm install passport`

Install **[passport-http](https://www.npmjs.com/package/passport-http)** for HTTP requests authentication config:

`npm install passport-http`

Install **[passport-jwt](http://www.passportjs.org/packages/passport-jwt/)** for JSON Web Token authentication config:

`npm install passport-jwt`

Install **[jsonwebtoken](https://jwt.io/)** for JSON Web Token implementation:

`npm install jsonwebtoken`

## Install DevDepencencies

Install **[Jest](https://jestjs.io/en/)** for testing:

`npm install --save-dev jest`

and set this config on scripts key on `package.json` file to run tests:

```
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand",
  "test:coverage": "jest --collect-coverage"
}
```

Install **[jest-mongodb](https://jestjs.io/docs/en/mongodb)** for mocking db connection:

`npm install --save-dev @shelf/jest-mongodb`

and set this config on `package.json` file:

```
"jest": {
  "preset": "@shelf/jest-mongodb"
}
```

Install **[SuperTest](https://www.npmjs.com/package/supertest)** for REST API Testing:

`npm install --save-dev supertest`

Install **[esLint](https://eslint.org/docs/user-guide/getting-started)** for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs:

`npm install --save-dev eslint`

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
