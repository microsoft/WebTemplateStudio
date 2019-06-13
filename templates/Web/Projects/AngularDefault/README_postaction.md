## Getting Started

In the root directory of the project...

1. Install node modules `yarn install` or `npm install`.
2. Start development server `yarn start` or `npm start`.

## Next Steps

//{[{
### Adding a New Page

1. Create a folder in `/src/app/app-shell` with your angular modules.
2. Add a child route for your page to `/src/app/*.module.ts`.
3. Add a button to the navigation bar in `/src/app/app-shell/nav-bar/nav-bar.component.html`.
//}]}

### Deployment

## File Structure
//{[{
The front-end is based on [Angular cli "ng"](https://angular.io/cli).
//}]}
The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
//^^
//{[{
├── src - Angular front-end
│ └── app - Angular main root module
│    ├── app-shell - Angular main components
│    └── app.module.ts - Angular root module.
//}]}
└── README.md
```

## Additional Documentation

//{[{
- Angular Docs - https://angular.io/docs
- Angular Router - https://angular.io/guide/router
//}]}
- Bootstrap CSS - https://getbootstrap.com/

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
