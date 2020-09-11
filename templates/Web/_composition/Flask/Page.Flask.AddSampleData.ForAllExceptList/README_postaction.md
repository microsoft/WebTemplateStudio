## Next Steps
//^^
//{[{
### Sample Data

Replace the sample data stored in /backend/sample_data.py.
Replace the default images. Sample images are consumed from https://wtsrepository.blob.core.windows.net/sampledata/.
//}]}

### Deployment

```
.
├── backend/ - Flask server that provides API routes and serves front-end
│ ├── constants.py - Defines the constants for the endpoints and port
//{[{
│ ├── sample_data.py - Contains all sample text data for generate pages
//}]}
│ └── server.py - Configures Port and HTTP Server and provides API routes
└── README.md
```
