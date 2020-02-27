## File Structure

//{[{
The back-end is based on [Moleculer CLI](https://moleculer.services/docs/0.14/usage.html#Create-a-Moleculer-project).
//}]}
The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
//{[{
├── server/ Directory with everything backend-related
│ ├── moleculer.config.js - Moleculer Service Broker configuration file. More info: https://moleculer.services/docs/0.14/broker.html
│ ├── services/ - Moleculer services that provides API routes and serves front-end with data
│ │ ├── api.service.js - HTTP gateway service
│ │ └── pages.service.js - Service that serves the data and contains the actual handlers for the API calls
//}]}
└── README.md
```

## Additional Documentation

- Bootstrap CSS - https://getbootstrap.com/
  //{[{
- Moleculer - https://moleculer.services/
  //}]}

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
