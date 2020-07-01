## Getting Started

1. Install node modules `yarn install` or `npm install`.
//{[{
2. Restore .Net packages `yarn restore-packages` or `npm restore-packages`
//}]}
2. Start development server `yarn start` or `npm start`.

## File Structure
//^^
//{[{
The back-end is based on [ASP.NET Web API](https://dotnet.microsoft.com/apps/aspnet/apis). It is served on https://localhost:5001/.
//}]}

```
.
//{[{
├── server/ - ASP.NET Web Api that provides API routes and serves front-end
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
