## File Structure

//{[{
The back-end is based on [Moleculer CLI](https://moleculer.services/docs/0.13/usage.html#Create-a-Moleculer-project).
//}]}
The front-end is served on http://localhost:3000/ and the back-end on http://localhost:3001/.

```
.
//{[{
├── services/ - Moleculer services that provides API routes and serves front-end with data
│ └── api.service.js - HTTP Gateway Service
│ ├── pages.service.js - Serves the actual content
//}]}
└── README.md
```

## Additional Documentation

- Bootstrap CSS - https://getbootstrap.com/
//{[{
- Moleculer - https://moleculer.services/
//}]}

  This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).
