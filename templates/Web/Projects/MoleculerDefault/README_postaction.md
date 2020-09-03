## Getting Started

1. Install dependencies using `Install dependencies` task (/*{[{*/or use `yarn install` or `npm install` in frontend and backend folders/*}]}*/).
2. Start development app using `Start App` task (/*{[{*/or use `yarn start` or `npm start` in frontend and backend folders/*}]}*/).

## File Structure
//^^
//{[{
The back-end is based on [Moleculer CLI](https://moleculer.services/docs/0.14/usage.html#Create-a-Moleculer-project). It is served on http://localhost:3001/.
//}]}

```
.
//{[{
├── backend/ Directory with everything backend-related
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

