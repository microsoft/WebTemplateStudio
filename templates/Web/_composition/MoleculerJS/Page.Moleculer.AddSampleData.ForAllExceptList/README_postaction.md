## Next Steps

//{[{

### Sample Data

Replace the sample data stored in `/data/sampleData.js`.
//}]}

### Deployment

.
├── server/ Directory with everything backend-related
│ ├── services/ - Moleculer services that provides API routes and serves front-end with data
│ │ ├── api.service.js - HTTP gateway service
│ │ └── pages.service.js - Service that serves the data and contains the actual handlers for the API calls
//{[{
├── data/ - Folder containing data samples
│ └── sampleData.js - Contains all sample text data required to generate pages
//}]}
