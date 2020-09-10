## Next Steps

//{[{
### Adding a New Page

1. Create a file in `frontend/src/views` with your Vue Template.
2. Add a route for your page to `frontend/src/router/index.js`.
3. Add a button to the navigation bar in `frontend/src/components/NavBar.vue`.
//}]}

## File Structure

//{[{
The front-end is based on [Vue CLI](https://cli.vuejs.org/). It is served on http://localhost:3000/.
//}]}

```
.
//^^
//{[{
├── frontend/ - Vue front-end app
│ ├── src - Vue front-end
│ │   ├── assets/                     - Default images
│ │   ├── components/                 - Common Vue components shared between different views
│ │   ├── router/                     - Vue routes
│ │   ├── views/                      - The main pages displayed
│ │   ├── constants.js                - Contains constants for error messages and endpoints
│ │   ├── App.vue                     - Base Vue template
│ └── └── main.js                     - Root Vue Component
//}]}
└── README.md
```

## Additional Documentation

//{[{
- Vue - https://vuejs.org/v2/guide/
- Vue Router - https://router.vuejs.org/
//}]}
- Bootstrap CSS - https://getbootstrap.com/
