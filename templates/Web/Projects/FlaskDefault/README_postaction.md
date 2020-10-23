## File Structure

├── backend/ - Backend App
//{[{
│ ├── scripts/ - scripts to publish
│ ├── constants.py - Defines the constants for the endpoints and port
│ └── server.py - Configures Port and HTTP Server and provides API routes
//}]}
└── README.md

### Backend

//{[{
The backend is based on [Flask](https://github.com/pallets/flask).

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `pip install -r requirements.txt` to install backend dependencies.
  3. Use `python3 server/server.py || python server/server.py || py -3 server/server.py` to start backend app in development. It is served on http://localhost:3001/
//}]}

## Additional Documentation
//^^
//{[{
- Flask - http://flask.pocoo.org/
//}]}
- Bootstrap CSS - https://getbootstrap.com/