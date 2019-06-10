## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Start development server `yarn start` or `npm start`.

## Next Steps
//{[{
### Adding a New Page

<<<<<<< HEAD
1. Create a file in `/src/views` with your Vue Template.
2. Add a route for your page to `/src/router/index.js`.
3. Add a button to the navigation bar in `/src/components/TheNavBar.vue`.
=======
<<<<<<< HEAD:templates/Web/Projects/ReactDefault/README_postaction.md~merged
1. Create a folder in `/src/components` with your react components.
2. Add a route for your page to `/src/App.js`.
3. Add a button to the navigation bar in `/src/components/NavBar/index.js`.
=======
1. Create a file in `/src/views` with your Vue Template.
2. Add a route for your page to `/src/router/index.js`.
3. Add a button to the navigation bar in `/src/components/TheNavBar.vue`.
>>>>>>> dev:templates/Web/Projects/VueDefault/README_postaction.md
>>>>>>> dev
//}]}
### Deployment

The generated templates can be deployed to Azure App Service using the following steps:

1. In the root directory of the project `yarn build` or `npm build` to create a build folder.
2. Move the build folder inside the server folder.
3. Deploy the server folder to Azure App Service using the [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice).
4. If a database is used, add the environment variables defined in .env to your Application Settings.
5. Consider adding authentication and securing back-end API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).
   Full documentation for deployment to Azure App Service can be found here: [Deployment Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/deployment.md).

## File Structure
//{[{
<<<<<<< HEAD
The front-end is based on [Vue CLI](https://cli.vuejs.org/).
=======
<<<<<<< HEAD:templates/Web/Projects/ReactDefault/README_postaction.md~merged
The front-end is based on [create-react-app](https://github.com/facebook/create-react-app).
=======
The front-end is based on [Vue CLI](https://cli.vuejs.org/).
>>>>>>> dev:templates/Web/Projects/VueDefault/README_postaction.md
>>>>>>> dev
//}]}
The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
//^^
/{[{
<<<<<<< HEAD
=======
<<<<<<< HEAD:templates/Web/Projects/ReactDefault/README_postaction.md~merged
├── src - React front-end
│ ├── components - React components for each page
│ ├── App.jsx - React routing
│ └── index.jsx - React root component
=======
>>>>>>> dev
├── src - Vue front-end
│   ├── assets/                     - Default images
│   ├── components/                 - Common Vue components shared between different views
│   ├── router/                     - Vue routes
│   ├── views/                      - The main pages displayed
│   ├── constants.js                - Contains constants for error messages and endpoints
│   ├── App.vue                     - Base Vue template
│   └── main.js                     - Root Vue Component
<<<<<<< HEAD
=======
>>>>>>> dev:templates/Web/Projects/VueDefault/README_postaction.md
>>>>>>> dev
//}]}
└── README.md
```

## Additional Documentation
//{[{
<<<<<<< HEAD
- Vue - https://vuejs.org/v2/guide/
- Vue Router - https://router.vuejs.org/
=======
<<<<<<< HEAD:templates/Web/Projects/ReactDefault/README_postaction.md~merged
- React - https://reactjs.org/
- React Router - https://reacttraining.com/react-router/
=======
- Vue - https://vuejs.org/v2/guide/
- Vue Router - https://router.vuejs.org/
>>>>>>> dev:templates/Web/Projects/VueDefault/README_postaction.md
>>>>>>> dev
//}]}
- Bootstrap CSS - https://getbootstrap.com/

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
