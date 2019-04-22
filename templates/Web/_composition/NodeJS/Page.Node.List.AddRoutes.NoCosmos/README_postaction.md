## Next Steps

//{[{

### Sample Data

Replace the sample data stored in /server/sampleData.js.
Replace the default images stored in /src/images.
//}]}

### Deployment
.
├── server/ - Express server that provides API routes and serves front-end
│ ├── routes/ - Handles API calls for routes
│ ├── app.js - Adds middleware to the express server
//{[{
│ ├── sampleData.js - Contains all sample text data for generate pages
//}]}
│ └── server.js - Configures Port and HTTP Server
