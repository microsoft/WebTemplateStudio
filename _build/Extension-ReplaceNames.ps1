[CmdletBinding()]
Param(
  [Parameter(Mandatory = $True, Position = 1)]
  [string]$extensionPath,

  [Parameter(Mandatory = $True, Position = 2)]
  [string]$vsixName,

  [Parameter(Mandatory = $True, Position = 3)]
  [string]$vsixDisplayName,

  [Parameter(Mandatory = $True, Position = 4)]
  [string]$versionNumber,

  [Parameter(Mandatory = $True, Position = 5)]
  [string]$aikey,

  [Parameter(Mandatory = $True, Position = 6)]
  [string]$commandCategory,

  [Parameter(Mandatory = $True, Position = 7)]
  [string]$wizardLaunchCommand,

  [Parameter(Mandatory = $True, Position = 8)]
  [string]$deployAppCommand
)
function Clear-WhiteSpace ($Text) {
  "$($Text -replace "(`t|`n|`r)"," " -replace "\s+"," ")".Trim()
}

## SET NAME AND VERSION IN VSIX Package json
if ($vsixName) {

  $vsixPackageJson = Join-Path $extensionPath "package.json"
  $vsixPackageNlsJson = Join-Path $extensionPath "package.nls.json"
  $vsixPackagei18nJson = Join-Path $extensionPath (Join-Path "locales" (Join-Path "en" "package.i18n.json"))
  $vsixExtensionTsFile = Join-Path $extensionPath (Join-Path "src" "extension.ts")

  # REPLACE Version, Name, DisplayName and commands IN package.json
  if (Test-Path($vsixPackageJson)) {

    Write-Host
    Write-Host "Setting name,version and commands in VSIX package json"

    $packagejsonContent = Get-Content $vsixPackageJson | ConvertFrom-Json
    $LocalIdentity = $packagejsonContent.name
    $localDisplayName = $packagejsonContent.displayName
    $localVersionNumber = $packagejsonContent.version
    $localAiKey = $packagejsonContent.aiKey
    $localwizardLaunchCommand = $packagejsonContent.contributes.commands[0].command
    $localdeployAppCommand = $packagejsonContent.contributes.commands[1].command

    Write-Host "Replacing $LocalIdentity by  $vsixName"
    Write-Host "Replacing $localDisplayName by  $vsixDisplayName"
    Write-Host "Replacing $localVersionNumber by  $versionNumber"
    Write-Host "Replacing $localwizardLaunchCommand by  $wizardLaunchCommand"
    Write-Host "Replacing $localdeployAppCommand by  $deployAppCommand"

    $content = (Get-Content -path $vsixPackageJson -Raw)

    $content = $content -replace "$LocalIdentity" , "$vsixName"
    $content = $content -replace [regex]::Escape("$localDisplayName") , "$vsixDisplayName"
    $content = $content -replace "$localVersionNumber" , "$versionNumber"
    $content = $content -replace "$localAiKey" , "$aikey"
    $content = $content -replace "$localwizardLaunchCommand" , "$wizardLaunchCommand"
    $content = $content -replace "$localdeployAppCommand" , "$deployAppCommand"

    [System.IO.File]::WriteAllLines($vsixPackageJson, $content, [System.Text.UTF8Encoding]($False))

    Write-Host "$resolvedPath - Version, Name, DisplayName and commands applied ($versionNumber, $vsixName, $vsixDisplayName, $wizardLaunchCommand, $deployAppCommand)"
  }
  else {
    throw "No VSIX package json file found."
  }

  # REPLACE command category IN package.nls.json
  if (Test-Path($vsixPackageNlsJson)) {

    $jsonFile = Get-Content $vsixPackageNlsJson | ConvertFrom-Json
    $localCommandCategory = $jsonFile.'webTemplateStudioExtension.commands.wts'
    Write-Host "Replacing $localCommandCategory command category by $commandCategory in package.nls.json"

    $content = (Get-Content -path $vsixPackageNlsJson -Raw)
    $content = $content -replace [regex]::Escape("$localCommandCategory") , "$commandCategory"

    [System.IO.File]::WriteAllLines($vsixPackageNlsJson, $content, [System.Text.UTF8Encoding]($False))
    Write-Host "$resolvedPath - category applied ($commandCategory)"
  }
  else {
    throw "No VSIX package.nls.json file found."
  }

  # REPLACE command category IN package.i18n.json
  if (Test-Path($vsixPackagei18nJson)) {

    $jsonFile = Get-Content $vsixPackagei18nJson | ConvertFrom-Json
    $localCommandCategory = $jsonFile.'webTemplateStudioExtension.commands.wts'
    Write-Host "Replacing $localCommandCategory command category by $commandCategory in package.i18n.json"

    $content = (Get-Content -path $vsixPackagei18nJson -Raw)
    $content = $content -replace [regex]::Escape("$localCommandCategory") , "$commandCategory"

    [System.IO.File]::WriteAllLines($vsixPackagei18nJson, $content, [System.Text.UTF8Encoding]($False))
    Write-Host "$resolvedPath - category applied ($commandCategory)"
  }
  else {
    throw "No VSIX package.i18n.json file found."
  }

  # REPLACE commands IN extension.ts
  if (Test-Path($vsixExtensionTsFile)) {

    $localWizardLaunchCommand = "webTemplateStudioExtension.wizardLaunch.local"
    $localdeployAppCommand = "webTemplateStudioExtension.deployApp.local"

    Write-Host
    Write-Host "Replacing $localWizardLaunchCommand by $wizardLaunchCommand in extension.ts"
    Write-Host "Replacing $localdeployAppCommand by $deployAppCommand in extension.ts"

    $content = (Get-Content -path $vsixExtensionTsFile -Raw)
    $content = $content -replace [regex]::Escape("$localWizardLaunchCommand") , "$wizardLaunchCommand"
    $content = $content -replace [regex]::Escape("$localdeployAppCommand") , "$deployAppCommand"

    [System.IO.File]::WriteAllLines($vsixExtensionTsFile, $content, [System.Text.UTF8Encoding]($False))
    Write-Host "$resolvedPath - Commands applied ($localWizardLaunchCommand, $localdeployAppCommand)"
  }
  else {
    throw "No VSIX extension.ts file found."
  }
}
else {
  throw "Identity is mandatory."
}

