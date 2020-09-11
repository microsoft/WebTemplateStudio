## Getting Started

1. Install dependencies using `Install dependencies` task (/*{[{*/or use `yarn install` or `npm install` frontend folder and `pip install -r requirements.txt` in backend folder/*}]}*/).
2. Start development app using `Start App` task (/*{[{*/or use `yarn start` or `npm start` in frontend folder and `python3 server/server.py || python server/server.py || py -3 server/server.py` in backend folder/*}]}*/).

## File Structure
//^^
//{[{
The back-end is based on [Flask](https://github.com/pallets/flask). It is served on http://localhost:3001/.
//}]}

```
.
//{[{
├── backend/ - Flask server that provides API routes and serves front-end
│ ├── constants.py - Defines the constants for the endpoints and port
│ └── server.py - Configures Port and HTTP Server and provides API routes
//}]}
└── README.md
```

## Additional Documentation

- Bootstrap CSS - https://getbootstrap.com/
//{[{
- Flask - http://flask.pocoo.org/
//}]}
