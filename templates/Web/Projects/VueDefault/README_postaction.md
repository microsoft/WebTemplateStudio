## File Structure

├── frontend/ - Frontend App
//{[{
│ ├── public/ - public static files
│ ├── scripts/ - scripts to publish
│ ├── src/ - Vue app folder
│ │   ├── assets/ - Default images
│ │   ├── components/ - Common Vue components shared between different views
│ │   ├── router/ -  Vue routes
│ │   ├── views/ - The main pages displayed
│ │   ├── App.vue - Base Vue template
│ │   ├── constants.js - Contains constants for error messages and endpoints
│ └── └── main.js - Root Vue Component
//}]}
└── README.md

### Frontend

//{[{
The frontend is based on [Vue CLI](https://cli.vuejs.org/).

The most important scripts in the `package.json` are:
  - start: serves the frontend in development on http://localhost:3000/.
  - build: Builds the app for production to the `build` folder.
  - publish: Builds the app for production and moves the output to the `publish` folder.
//}]}

## Additional Documentation

//{[{
- Vue - https://vuejs.org/v2/guide/
- Vue Router - https://router.vuejs.org/
//}]}
