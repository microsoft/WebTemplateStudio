## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Start development server `yarn start` or `npm start`.

## Next Steps

### Deployment

The generated templates can be deployed to Azure App Service using the following steps:

1. In the root directory of the project `yarn build` or `npm build` to create a build folder.
2. Move the build folder inside the server folder.
3. Deploy the server folder to Azure App Service using the [Azure App Service Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice).
4. If a database is used, add the environment variables defined in .env to your Application Settings.
5. Consider adding authentication and securing back-end API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).
   Full documentation for deployment to Azure App Service can be found here: [Deployment Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/deployment.md).

## File Structure

The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
└── README.md
```

## Additional Documentation

- Bootstrap CSS - https://getbootstrap.com/

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
