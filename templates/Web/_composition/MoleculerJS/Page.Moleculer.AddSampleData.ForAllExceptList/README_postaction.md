## Next Steps
//^^
//{[{
### Sample Data

Replace the sample data stored in `backend/data/sampleData.js`.
Replace the default images. Sample images are consumed from https://wtsrepository.blob.core.windows.net/sampledata/.
//}]}

### Deployment

```
.
├── backend/ Directory with everything backend-related
│ ├── moleculer.config.js - Moleculer Service Broker configuration file. More info: https://moleculer.services/docs/0.14/broker.html
│ ├── services/ - Moleculer services that provides API routes and serves front-end with data
│ │ ├── api.service.js - HTTP gateway service
│ │ └── pages.service.js - Service that serves the data and contains the actual handlers for the API calls
//{[{
│ └── data/ - Folder containing data samples
│   └── sampleData.js - Contains all sample text data required to generate pages
//}]}
```