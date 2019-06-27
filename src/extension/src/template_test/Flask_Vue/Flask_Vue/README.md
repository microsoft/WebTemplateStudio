## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Install Python dependencies `yarn install-requirements` or `npm install-requirements`
2. Start development server `yarn start` or `npm start`.

## Next Steps


### Sample Data

Replace the sample data stored in /server/sampleData.py.
Replace the default images stored in /src/images.

### Adding a New Page

1. Create a file in `/src/views` with your Vue Template.
2. Add a route for your page to `/src/router/index.js`.
3. Add a button to the navigation bar in `/src/components/TheNavBar.vue`.

### Deployment

The generated templates can be deployed to Azure App Service using the following steps:

1. In the root directory of the project `yarn build` or `npm build` to create a build folder.
2. Move the build folder inside the server folder.
3. Deploy the server folder to Azure App Service using the [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice).
4. If a database is used, add the environment variables defined in .env to your Application Settings.
5. Consider adding authentication and securing back-end API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).
   Full documentation for deployment to Azure App Service can be found here: [Deployment Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/deployment.md).

## File Structure
The front-end is based on [Vue CLI](https://cli.vuejs.org/).

The back-end is based on [Flask](https://github.com/pallets/flask).

The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
├── server/ - Flask server that provides API routes and serves front-end
│ ├── constants.py - Defines the constants for the endpoints and port
│ ├── sampleData.py - Contains all sample text data for generate pages
│ └── server.py - Configures Port and HTTP Server and provides API routes
├── src - Vue front-end
│   ├── assets/                     - Default images
│   ├── components/                 - Common Vue components shared between different views
│   ├── router/                     - Vue routes
│   ├── views/                      - The main pages displayed
│   ├── constants.js                - Contains constants for error messages and endpoints
│   ├── App.vue                     - Base Vue template
│   └── main.js                     - Root Vue Component
└── README.md
```

## Additional Documentation
- Vue - https://vuejs.org/v2/guide/
- Vue Router - https://router.vuejs.org/

- Bootstrap CSS - https://getbootstrap.com/
- Flask - http://flask.pocoo.org/


  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
