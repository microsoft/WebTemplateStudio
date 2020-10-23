## File Structure

├── frontend/ - Frontend App
//{[{
│ ├── e2e/ - end to end tests
│ ├── scripts/ - scripts to publish
│ ├── src/ Angular app folder
│ │ ├── app - Angular main root module
│ │ │ ├── app-shell - Angular main components
│ └─└─└── app.module.ts - Angular root module.
//}]}
└── README.md

### Frontend

//{[{
The frontend is based on [Angular cli "ng"](https://angular.io/cli).

The most important scripts in the `package.json` are:
  - start: serves the frontend in development on http://localhost:3000/.
  - build: Builds the frontend app. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
  - publish: Builds the app for production and moves the output to the `publish` folder.
  - test: execute the unit tests via [Karma](https://karma-runner.github.io).
  - e2e: execute the end-to-end tests via [Protractor](http://www.protractortest.org/)
//}]}

## Additional Documentation

//{[{
- Angular Docs - https://angular.io/docs
- Angular Router - https://angular.io/guide/router
//}]}