## Getting Started

1. Install dependencies using `Install dependencies` task (/*{[{*/or use `yarn install` or `npm install` frontend folder and `dotnet restore` in backend folder/*}]}*/).
2. Start development app using `Start App` task (/*{[{*/or use `yarn start` or `npm start` in frontend folder and `dotnet run` in backend folder/*}]}*/).

## File Structure
//^^
//{[{
The back-end is based on [ASP.NET Web API](https://dotnet.microsoft.com/apps/aspnet/apis). It is served on https://localhost:5001/.
//}]}

```
.
//{[{
├── backend/ - ASP.NET Web Api that provides API routes and serves front-end
│ ├── Contracts/ - Interfaces for services
│ ├── Controllers/ - Handles API calls for routes
│ ├── Models/ - Data models
│ ├── Services/ - Data services
│ ├── appsettings.json - Configuration data file
│ ├── Program.cs - Contains create host and run application
│ ├── Startup.cs - Register services and configure application
│ └── WebApi.csproj - Configures Port and HTTP Server
//}]}
└── README.md
```

## Additional Documentation

- Bootstrap CSS - https://getbootstrap.com/
//{[{
- .NET - https://dotnet.microsoft.com/
- ASP.NET - https://dotnet.microsoft.com/apps/aspnet
//}]}
