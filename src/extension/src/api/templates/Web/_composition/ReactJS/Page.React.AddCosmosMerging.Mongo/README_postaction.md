### Adding a New Page

1. Create a folder in `/src/components` with your react components.
2. Add a route for your page to `/src/App.js`.
3. Add a button to the navigation bar in `/src/components/NavBar/index.js`.

//{[{

### Cosmos Database

**Do Not share the keys stored in the .env file publicly.**
The Cosmos database will take approximately 5 minutes to deploy. Upon completion of deployment,
a notification will appear in VS Code and your connection string will be automatically added
the .env file. The schema and operations for the Cosmos database are defined in `/server` folder.
Additional documentation can be found here: [Cosmos Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/services/azure-cosmos.md).
//}]}

### Deployment

The generated templates can be deployed to Azure App Service using the following steps:

├── server/ - Express server that provides API routes and serves front-end
//{[{
│ ├── mongo/ - Handles all interactions with the cosmos database
//}]}
│ ├── routes/ - Handles API calls for routes
│ ├── app.js - Adds middleware to the express server
│ ├── constants.js - Defines the constants for the endpoints and port
│ └── server.js - Configures Port and HTTP Server
│ ├── App.jsx - React routing
│ └── index.jsx - React root component
//{[{
├── .env - API Keys
//}]}
└── README.md

```

## Additional Documentation

- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/
- Bootstrap CSS - https://getbootstrap.com/
- Express - https://expressjs.com/
//{[{
- Mongo/Mongoose - https://mongoosejs.com/docs/guide.html
- Cosmos DB - https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-mongoose
//}]}

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).