## File Structure

├── backend/ - Backend App
//{[{
│ ├── scripts/ - scripts to publish
│ ├── services/ - Moleculer services that provides API routes and serves frontend with data
│ │ ├── api.service.js - HTTP gateway service
│ │ └── pages.service.js - Service that serves the data and contains the actual handlers for the API calls
│ └── moleculer.config.js - Moleculer Service Broker configuration file. More info: https://moleculer.services/docs/0.14/broker.html
//}]}
└── README.md

### Backend

//{[{
The backend is based on [Moleculer CLI](https://moleculer.services/docs/0.14/usage.html#Create-a-Moleculer-project).

The most important scripts in the `package.json` are:
  - start: serves the backend on http://localhost:3001/.
  - start-dev: serves the backend in development on http://localhost:3001/.
  - publish: copies the backend files to the `publish` folder.

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `yarn install` or `npm install` to install backend dependencies.
  3. Use `yarn start-dev` or `npm start-dev` to start backend app in development.
//}]}

## Additional Documentation
//^^
//{[{
- Moleculer - https://moleculer.services/
//}]}
- Bootstrap CSS - https://getbootstrap.com/