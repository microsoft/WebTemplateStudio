//^^
//{[{
//Build backend app
fse.emptyDirSync('./publish');
childProcess.execSync("dotnet clean ./server /p:GenerateFullPaths=true /consoleloggerparameters:NoSummary", { stdio: "inherit" });
childProcess.execSync("dotnet publish ./server -c Release -o ./publish /p:GenerateFullPaths=true /consoleloggerparameters:NoSummary", { stdio: "inherit" });

//}]}
//Move client
//{[{
fse.moveSync("./build", "./publish/ClientApp/build", { overwrite: true });
//}]}