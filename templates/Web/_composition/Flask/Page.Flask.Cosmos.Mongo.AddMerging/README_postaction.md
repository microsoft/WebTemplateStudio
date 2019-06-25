## Next Steps
//^^
//{[{

### Cosmos Database

**Do Not share the keys stored in the .env file publicly.**
The Cosmos database will take approximately 5 minutes to deploy. Upon completion of deployment,
a notification will appear in VS Code and your connection string will be automatically added in
the .env file. The schema and operations for the Cosmos database are defined in `/server` folder.
Additional documentation can be found here: [Cosmos Docs](https://github.com/Microsoft/WebTemplateStudio/blob/dev/docs/services/azure-cosmos.md).
//}]}

## File Structure

The back-end is based on [Flask](https://github.com/pallets/flask).
The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
├── server/ - Flask server that provides API routes and serves front-end
//{[{
│ ├── mongo/ - Handles all interactions with the cosmos database
//}]}
│ ├── constants.py - Defines the constants for the endpoints and port
│ └── server.py - Configures Port and HTTP Server and provides API routes
└── README.md
```

## Additional Documentation

- Bootstrap CSS - https://getbootstrap.com/
//^^
//{[{
- Cosmos DB - https://docs.microsoft.com/en-us/azure/cosmos-db/mongodb-mongoose
//}]}

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
