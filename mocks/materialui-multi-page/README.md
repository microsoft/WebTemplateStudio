## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`
2. Start development server `yarn start` or `npm start`

## Next Steps

### Sample Data

Replace the sample data stored in /server/sampleData.js.
Replace the default images stored in /src/images.

### Adding a New Page

1. Create a folder in `/src/components` with your react components
2. Add a route for your page to `/src/App.js`
3. Add a button to the navigation bar in `/src/components/NavBar/index.js`

### Cosmos Database

**Do Not share the keys stored in the .env file publicly.**

The Cosmos database will take approximately 5 minutes to deploy. Upon completion of deployment,
a notification will appear in VS Code and your connection string will be automatically added
the .env file. The schema and operations for the Cosmos database are defined in `/server` folder.
Additional documentation can be found here: [Cosmos Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/services/azure-cosmos.md)

### Azure Functions

An Azure Function with a Node runtime stack and HTTP trigger has been deployed to Azure. Project Acorn
has also generated a folder containing the code deployed to Azure Functions. To edit and redeploy the Azure
Function it is recommended to install the [Azure Functions Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions). Additional documentation can be found here: [Azure Function Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/services/azure-functions.md)

### Deployment

The generated templates can be deployed to Azure App Service using the following steps:

1. In the root directory of the project `yarn build` or `npm build` to create a build folder
2. Move the build folder inside the server folder
3. Deploy the server folder to Azure App Service using the [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice)
4. If a database is used, add the environment variables defined in .env to your Application Settings
5. Consider adding authentication and securing back end API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security)

Full documentation for deployment to Azure App Service can be found here: //TODO Add link to deployment doc

## File Structure

The front end is based on [create-react-app](https://github.com/facebook/create-react-app), and the
back end is based on [Express Generator](https://expressjs.com/en/starter/generator.html). The front
end is served on http://localhost:3000/ and the back end on http://localhost:3001/. During local
development front end and back end communicate via a proxy defined in the package.json.

```
.
├── server/                         - Express server that provides API routes and serves front end
│   ├── mongo/                      - Handles all interactions with the cosmos database
│   ├── sql/                        - Handles all interactions with the cosmos database
│   ├── routes/                     - Handles API calls for routes
│   ├── views/                      - Pug error page
│   ├── app.js                      - Adds middleware to the express server
│   ├── constants.js                - Defines the constants for the endpoints and port
│   ├── sampleData.js               - Contains all sample text data for generate pages
│   └── server.js                   - Configures Port and HTTP Server
├── src                             - React front end
│   ├── components                  - React components for each page
│   ├── images                      - Default images
│   ├── constants.js                - Contains constants for error messages and endpoints
│   ├── App.jsx                     - React routing
│   └── index.jsx                   - React root component
├── .env                            - API Keys
└── README.md
```

## Additional Documentation

- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/
- Bootstrap CSS - https://getbootstrap.com/
- Express - https://expressjs.com/
- Mongo/Mongoose - https://mongoosejs.com/docs/guide.html
- Cosmos DB - https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-mongoose

This project was created using [Project Acorn](https://github.com/Microsoft/WebTemplateStudio)
