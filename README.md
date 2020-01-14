# Blog Practice

## Project's goal
We want to implement a service for **blog management with persistence and REST API**. Blog entries may have comments and avoid the publication of those that may be offensive, the service must include a offensive-words validator.

## Functionalities
The information entities that the blog should manage are:
* **Post**: Each entry contains the following fields: Author's name, Author's nickname, Title, Text, List of comments.
* **Comment**: Each comment contains the following fields: Nickname of the author of the comment, Content, Date of the comment.
* **OffensiveWord**: Each word will have an associated "level" field indicating the severity of the word from 1 to 5.

## Endpoints
Entries and comments:
* GET: Recover of all entries (no comments) `/posts`
* GET: Recover an entry (with comments) `/posts/:id`
* POST: Create of a new entry (no comments) `/posts`
* DELETE: Delete an existing entry (with all your comments) `/posts/:id`
* PUT: Modify of an existing entry `/posts/:id`

* POST: Add a new comment to an entry `/posts/:id/comments`
* PUT: Modify an existing comment `/posts/:id/comments/:id`
* DELETE: Delete an existing comment in an entry `/posts/:id/comments/:id`

Offensive words:
* POST: Save a new offensive word `/offensive-words`
* GET: List all offensive words `/offensive-words`
* DELETE: Delete an offensive word `/offensive-words/:word`
* PUT: Modify an existing offensive word `/offensive-words/:word`

### Offensive words collection database
If the comment you are trying to incorporate contains any of the offensive words registered in the database, the comment cannot be created. The REST request **will be rejected with an error code and a JSON will be returned with information about the offensive word (or words) and its level**. 

Offensive words will be stored in the database. If the application detects that there are no offensive words in the database, the application must insert a **default offensive-words set**.

## Project's Structure:
```
├── /server (server folder)
│    ├── app.js (app module, express server)
│    │
│    ├── /controllers (router APIs REST)
│    │   ├── authRouter.js (authentication login API methods)
│    │   ├── commentsRouter.js (comments collection API methods)
│    │   ├── offensiveRouter.js (offensive-words collection API methods)
│    │   ├── postsRouter.js (posts collection API methods)
│    │   └── signupRouter.js (users collection API methods)
│    │
│    ├── /middlewares (middlewares folder)
│    │   └── isRoleAllowed.js (user role controller method)
│    │
│    ├── /postman (postman config folder)
│    │   ├── Blog-Admin.postman_environment.json (AdminUser Environment config file to import in Postman)
│    │   ├── Blog-Publisher.postman_environment.json (PublisherUser Environment config file to import in Postman)
│    │   └── postman.json (REST APIs information to import in Postman application)
│    │
│    ├── /repository (database connection and interaction)
│    │   ├── comments.js (comments collection interaction methods)
│    │   ├── index.js (main database connection)
│    │   ├── offensiveWords.js (offensive-words collection interaction methods)
│    │   ├── posts.js (posts collection interaction methods)
│    │   └── users.js (users collection interaction methods)
│    │
│    ├── /tests (testing js files with jest)
│    │   ├── onlyUsers.test.js
│    │   └── validator.test.js
│    │
│    ├── /utils (js files)
│    │   ├── /data
│    │   │   ├── defaultWords.js (default offensiveWords array)
│    │   │   └── defaultUsers.js (default users array to try the application)
│    │   ├── onlyUsers.js (management user info methods)
│    │   ├── passport.js (passport config)
│    │   └── validator.js (check offensiveWords in a comment text)
│    │
│    ├── .eslintrc.json (eslint configuration)
│    ├── package.json (dependencies and project information)
│    ├── server.cert(openssl self-signed SLL certificate)
│    └── server.key(openssl self-signed SLL key)
│
├── /client (frontend folder)
│
├── .gitignore (gitignore file configuration)
├── README.md
```

## REST API
The REST API must be level2 maturity and the format of the URLs must identify resources, not actions.
A `postman.json` file must be delivered with at least one example of each endpoint of the REST API.

## Persistence DataBase
Persistence will be implemented with **MongoDB**. 
Optionally, the practice can be delivered with the persistence of offensive words in a MySQL database (with or without ORM).

## Unit Testing
* **Comment with offensive words**: if the comment has an offensive word, the corresponding error must be generated.
* **Comment without offensive words**: if the comment does not have offensive words, an OK validation must be obtained.

## Install Depencencies
Install **Node.js**:

`npm install -g node`

Install **Express.js** for building REST APIs:

`npm install express`

Install **MongoDB** for buildig Non-Relational(NoSQL) Database:

`npm install mongodb`

Install **CORS** node.js package for providing a Connect/Express middleware that can be used to enable CORS:

`npm install cors`

## Install DevDepencencies
Install **Jest** for testing:

`npm install --save-dev jest`

Install **esLint** for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs:

`npm install --save-dev eslint`

## Run the application
Run the app.js file with node in your terminal:

`node app.js`

The server is running now on safe port [https://localhost:3443](https://localhost:3443).

Open **Postman app** and import `postman.json` file to interact with REST APIs endpoints

Open **MongoDB Compass app** to interact with app database and collections. Connect to [http://localhost:27017](http://localhost:27017). 
