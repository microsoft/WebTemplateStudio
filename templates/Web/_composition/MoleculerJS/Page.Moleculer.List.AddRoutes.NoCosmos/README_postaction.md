## Next Steps

//{[{

### Sample Data

Replace the sample data stored in /server/sampleData.js.
Replace the default images stored in /src/images.
//}]}

### Deployment

.
├── services/ - Moleculer services that provides API routes and serves front-end with data
│ └── api.service.js - HTTP gateway service
│ ├── pages.service.js - Service that serves the data
│ ├── pages.actions.js - Contains the actual handlers for the API calls
//{[{
│ ├── sampleData.js - Contains all sample text data required to generate pages
//}]}
