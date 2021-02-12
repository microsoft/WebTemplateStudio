## File Structure

├── backend/ - Backend App
//{[{
│ ├── routes/ - Handles API calls for routes
│ ├── scripts/ - scripts to publish
│ ├── app.js - Adds middleware to the express server
│ ├── constants.js - Defines the constants for the endpoints and port
│ └── server.js - Configures Port and HTTP Server
//}]}
└── README.md

### Backend

//{[{
The backend is based on [Express Generator](https://expressjs.com/en/starter/generator.html).

The most important scripts in the `package.json` are:
  - start: serves the backend in development on http://localhost:3001/.
  - publish: copies the backend files to the `publish` folder.

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `yarn install` or `npm install` to install backend dependencies.
  3. Use `yarn start` or `npm start` to start backend app in development.
//}]}

## Additional Documentation
//^^
//{[{
- Express - https://expressjs.com/
//}]}
- Bootstrap CSS - https://getbootstrap.com/