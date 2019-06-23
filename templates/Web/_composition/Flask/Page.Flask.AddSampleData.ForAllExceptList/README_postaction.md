## Next Steps

//{[{

### Sample Data

Replace the sample data stored in /server/sampleData.py.
Replace the default images stored in /src/images.
//}]}

### Deployment
.
├── server/ - Flask server that provides API routes and serves front-end
│ ├── constants.py - Defines the constants for the endpoints and port
//{[{
│ ├── sampleData.py - Contains all sample text data for generated pages
//}]}
│ └── server.py - Configures Port and HTTP Server and provides API routes
