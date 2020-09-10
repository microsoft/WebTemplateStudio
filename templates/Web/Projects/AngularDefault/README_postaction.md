## Next Steps

//{[{
### Adding a New Page

1. Create a folder in `frontend/src/app/app-shell` with your angular modules.
2. Add a child route for your page to `frontend/src/app/app.module.ts`.
3. Add a button to the navigation bar in `frontend/src/app/app-shell/nav-bar/nav-bar.component.html`.
//}]}

## File Structure

//{[{
The front-end is based on [Angular cli "ng"](https://angular.io/cli). It is served on http://localhost:3000/.
//}]}

```
.
//^^
//{[{
├── frontend/ - React front-end
│ ├── src - Angular front-end
│ │ ├── app - Angular main root module
│ │ │ ├── app-shell - Angular main components
│ └─└─└── app.module.ts - Angular root module.
//}]}
└── README.md
```

## Additional Documentation

//{[{
- Angular Docs - https://angular.io/docs
- Angular Router - https://angular.io/guide/router
//}]}
- Bootstrap CSS - https://getbootstrap.com/
