## Getting Started

1. Install dependencies using `Install dependencies` task (/*{[{*/or use `yarn install` or `npm install` in frontend and backend folders/*}]}*/).
2. Start development app using `Start App` task (/*{[{*/or use `yarn start` or `npm start` in frontend and backend folders/*}]}*/).

## File Structure
//^^
//{[{
The back-end is based on [Express Generator](https://expressjs.com/en/starter/generator.html). It is served on http://localhost:3001/.
//}]}

```
.
//{[{
├── backend/ - Express server that provides API routes and serves front-end
│ ├── routes/ - Handles API calls for routes
│ ├── app.js - Adds middleware to the express server
│ ├── constants.js - Defines the constants for the endpoints and port
│ └── server.js - Configures Port and HTTP Server
//}]}
└── README.md
```

## Additional Documentation

- Bootstrap CSS - https://getbootstrap.com/
//{[{
- Express - https://expressjs.com/
//}]}
