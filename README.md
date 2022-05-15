# TodoApp
 A fullstack todo app on the MERN stack.

 This is a learning project for me to explore all of the technology and ideas behind creating a full stack application. My goal for this project was to learn about authentication, storing data in MongoDB and returning JWT's to be used for authentication with middlewares.

 It will use React for the frontend web app, which will communicate with a Node/Express API over standard HTTP methods.

 The API will communicate with a specified MongoDB instance to save user logins and data. The username will be saved, while the password is hashed and salted using the bcrypt library. On successful login, the user's id and username are taken and a JWT is signed then passed back to the client. The JWT will be used to access the protected routes on /api/todo.

 Docker is used to host the containers for both the apps and the MongoDB database.

 ## Planning

First I wanted to note down what functionality I wanted this app to have.

The app should support the following :

UI
- Login landing page
    - Page with username, password, login fields and register under that [x]

- Homepage
    - Show all Todo's that belong to this user account [x]
    - The topbar will just have TodoApp and logout [x]
    - Should be a 'Welcome (username)' section right before todo's begin [x]
- Todos will render down in a list style [ ]
    - The topmost element will be dotted to denote fill in, can type in a todo and enter/green check to create [ ]
    - Existing todo's will have checkbox followed by text, with an (x) to delete the todo on rightmost [x]

API
- Authentication
    - Register an account with a username/password [x]
    - Login to the app with this account [x]
    - Return JWT token [x]
    - Require JWT to access todo functionalities [x]
- Todos
    - Return all todo's of a logged in user [x]
    - Get a specific todo [x]
    - Edit a specific todo [x]
    - Delete a specific todo [x]