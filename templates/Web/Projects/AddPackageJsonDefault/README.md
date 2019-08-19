## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Start development server `yarn start` or `npm start`.

## Next Steps

### Deployment

If you selected Azure App Service when creating your project, follow these steps:

1. Press `Ctrl + Shift + P` in Windows/Linux or `Shift ⇧ + Command ⌘ + P` in Mac and type/select `Web Template Studio: Deploy App` to start deploying your app.
2. After your project is built, click on "server" in the pop up on the top middle section of your screen, and then click "Deploy" on the window pop up.
3. Once the deployment is done, click "Browse website" in the notification window on the lower right corner to check out your newly deployed app.

If you did not select Azure App Service and want to create a new Azure App Service web app, follow these steps:

1. Press `Ctrl + Shift + P` in Windows/Linux or `Shift ⇧ + Command ⌘ + P` in Mac and type/select `Azure App Service: Create New Web App...` to create a new web app.
   - Select your subscription
   - Enter your web app name
   - Select Linux as your OS
   - Select Node.js 10.14 for a Node/Express application, Python 3.7 for a Flask application
2. Once the creation is done, click "Deploy" in the notification window on the lower right corner.
   - Click "Browse" on the top middle section of your screen and select the server folder within your project
   - Click "Yes" in the notification window on the lower right corner (build prompt)
   - Click "Deploy" on the window pop up
   - Click "Yes" in the notification window on the lower right corner again
3. Once the deployment is done, click "Browse website" in the notification window on the lower right corner to check out your newly deployed app.

Consider adding authentication and securing back-end API's by following [Azure App Service Security](https://docs.microsoft.com/en-us/azure/app-service/overview-security).

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
