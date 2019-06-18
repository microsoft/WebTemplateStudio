## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Start development server `yarn start` or `npm start`.

## Next Steps


### Sample Data

Replace the sample data stored in /server/sampleData.js.
Replace the default images stored in /src/images.


### Adding a New Page

1. Create a folder in `/src/app/app-shell` with your angular modules.
2. Add a child route for your page to `/src/app/*.module.ts`.
3. Add a button to the navigation bar in `/src/app/app-shell/NavBar/navbar.component.html`.


### Deployment

The generated templates can be deployed to Azure App Service using the following steps:

1. In the root directory of the project `yarn build` or `npm build` to create a build folder.
2. Move the build folder inside the server folder.
3. Deploy the server folder to Azure App Service using the [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice).
4. If a database is used, add the environment variables defined in .env to your Application Settings.
5. Consider adding authentication and securing back-end API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).
   Full documentation for deployment to Azure App Service can be found here: [Deployment Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/deployment.md).

## File Structure

The back-end is based on [Express Generator](https://expressjs.com/en/starter/generator.html).
The front-end is based on [Angular cli "ng"](https://angular.io/cli).

The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
├── server/ - Express server that provides API routes and serves front-end
│ ├── routes/ - Handles API calls for routes
│ ├── app.js - Adds middleware to the express server
│ ├── sampleData.js - Contains all sample text data for generate pages
│ ├── constants.js - Defines the constants for the endpoints and port
│ └── server.js - Configures Port and HTTP Server
├── src - Angular front-end
│ └── app - Angular main root module
│    ├── components - Angular main components
│    └── app.module.ts - Angular root module.
└── README.md
```

## Additional Documentation

- Angular Docs - https://angular.io/docs
- Angular Router - https://angular.io/guide/router

- Bootstrap CSS - https://getbootstrap.com/
- Express - https://expressjs.com/


  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
