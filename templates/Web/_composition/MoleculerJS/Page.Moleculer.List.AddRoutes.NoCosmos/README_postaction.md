## Next Steps

//{[{

### Sample Data

Replace the sample data stored in /server/sampleData.js.
Replace the default images stored in /src/images.
//}]}

### Deployment

.
├── services/ - Moleculer services that provides API routes and serves front-end with data
│ └── api.service.js - HTTP Gateway Service
│ ├── pages.service.js - Serves the actual content
//{[{
│ ├── sampleData.js - Contains all sample text data for generate pages
//}]}
