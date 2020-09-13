//^^
//{[{
### Sample Data

Replace the sample data stored in /backend/sampleData.js.
Replace the default images. Sample images are consumed from https://wtsrepository.blob.core.windows.net/sampledata/.
//}]}

## File Structure

```
.
├── backend/ - Express server that provides API routes and serves front-end
│ ├── routes/ - Handles API calls for routes
│ ├── app.js - Adds middleware to the express server
//{[{
│ ├── sampleData.js - Contains all sample text data for generate pages
//}]}
│ └── server.js - Configures Port and HTTP Server
```
