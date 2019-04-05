## Next Steps

//{[{

### Sample Data

Replace the sample data stored in /server/sampleData.js.
Replace the default images stored in /src/images.
//}]}

### Adding a New Page

1. Create a folder in `/src/components` with your react components.
2. Add a route for your page to `/src/App.js`.
3. Add a button to the navigation bar in `/src/components/NavBar/index.js`.

.
├── server/ - Express server that provides API routes and serves front-end
│ ├── routes/ - Handles API calls for routes
│ ├── app.js - Adds middleware to the express server
//{[{
│ ├── sampleData.js - Contains all sample text data for generate pages
//}]}
│ └── server.js - Configures Port and HTTP Server
