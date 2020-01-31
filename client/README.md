# Blog Vue Client

## Functionalities
The information entities that the blog should manage are:

- **Post**: Each entry contains the following fields: Author's name, Author's nickname, Title, Text, List of comments.
- **Comment**: Each comment contains the following fields: Nickname of the author of the comment, Content, Date of the comment.
- **OffensiveWord**: Each word will have an associated "level" field indicating the severity of the word from 1 to 5.

## Views
- **Home** on route `/`:
  - If you are login, you can see myprofile, posts and new post buttons
  - If you are not login, you can see login, signup and posts buttons
- **Login** on route `/login` for user login and redirect to myprofile view
- **Signup** on route `/signup` for new user registry and redirect to login view
- **Profile** on route `/myprofile` for user panel with user information and user posts. You only can access to this view if you are login. If you are not login, this view redirect to login view.
- **NewPost** on route `/myprofile/newpost`. You need login to access
- **Posts** on route`/posts` to see all posts. You don't need login to access
- **PostDetail** on route`/post/:id` to see the content of one post and all comments.
  - If you are login, and you are owner of post/comment or you haveadmin role, you can see edit and delete buttons.
  - If you are not login, you can only read the post and comments. You need login to comment.
- **AdminWords** on route `/myprofile/words to see and add/edit/delete offensive words. Only you can access here if you have admin role.


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

The user token and data is store on browser localStore.


## Client's Structure:

```
├── /client (client folder)
│    │
│    ├── /public ()
│    │   └── index.html (html structure)
│    │
│    ├── /src (src folder)
│    │   ├── /assets(image files)
│    │   ├── /components (app vue components)
│    │   ├── /plugins(vuetify config)
│    │   ├── /resources(AJAX requests)
│    │   ├── /router(router vue config)
│    │   ├── /stores(login data user management)
│    │   └── /views(app views)
│    │   
│    ├── App.vue (app root component)
│    ├── main.js (config and render App.vue component)
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

Install **[axios](https://github.com/axios/axios)**:

`npm install axios`

Install **[core-js](hhttps://github.com/zloirock/core-js/blob/master/README.md)** modular standard library for JavaScript:

`npm install --save core-js@3.6.4`

Install **[Vue](https://vuejs.org/)**:

`npm install vue`

Install **[vue-router](https://router.vuejs.org/)** for router pages:

`npm install vue-router`

Install **[vuetify](https://vuetifyjs.com/en/)** for user material design components:

`npm install vuetify`


## Install DevDepencencies

Install **[vue-cli](https://cli.vuejs.org/)**

`npm install --save-dev vue-cli`

Install **[esLint](https://eslint.org/docs/user-guide/getting-started)** for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs:

`npm install --save-dev eslint`

Install **[cypress](https://www.cypress.io/)** for E2E testing

`npm install --save-dev cypress`

## Compiles and hot-reloads for development and run the app
`
npm run serve
`

## Run End2End tests

From `client/` folder, run End2End testing using:

**Warning** Remember to run the fake server using: `npm run fake-server` from server/ folder

`npm run test:e2e`



### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
