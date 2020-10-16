## File Structure

├── backend/ - Backend App
//{[{
│ ├── Contracts/ - Interfaces for services
│ ├── Controllers/ - Handles API calls for routes
│ ├── Models/ - Data models
│ ├── Scripts/ - scripts to publish
│ ├── Services/ - Data services
│ ├── appsettings.json - Configuration data file
│ ├── Program.cs - Contains create host and run application
│ ├── Startup.cs - Register services and configure application
│ └── WebApi.csproj - Configures Port and HTTP Server
//}]}
└── README.md

### Backend

//{[{
The backend is based on [ASP.NET Web API](https://dotnet.microsoft.com/apps/aspnet/apis).

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `dotnet restore` to restore backend packages.
  3. Use `dotnet run` to start backend app in development. It is served on https://localhost:5001/
//}]}

## Additional Documentation
//^^
//{[{
- .NET - https://dotnet.microsoft.com/
- ASP.NET - https://dotnet.microsoft.com/apps/aspnet
//}]}
- Bootstrap CSS - https://getbootstrap.com/