Set-Location $PSScriptRoot

$publishPath = "../../publish"
$backendPath = "../../backend"

Write-Host "Remove old publish backend"
Get-ChildItem "$publishPath/*" -exclude build | Remove-Item

Write-Host "Execute clean command"
Invoke-Expression 'dotnet clean $backendPath /p:GenerateFullPaths=true /consoleloggerparameters:NoSummary'

Write-Host "Execute publish command"
Invoke-Expression 'dotnet publish $backendPath -c Release -o $publishPath /p:GenerateFullPaths=true /consoleloggerparameters:NoSummary'

Write-Host "Finished"