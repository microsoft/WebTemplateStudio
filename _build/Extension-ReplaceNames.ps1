[CmdletBinding()]
Param(
  [Parameter(Mandatory=$True,Position=1)]
  [string]$vsixPackageJson,

  [Parameter(Mandatory=$True,Position=2)]
  [string]$vsixName,

  [Parameter(Mandatory=$True,Position=3)]
  [string]$vsixDisplayName,

  [Parameter(Mandatory=$True,Position=4)]
  [string]$versionNumber
)
function Clear-WhiteSpace ($Text) {
  "$($Text -replace "(`t|`n|`r)"," " -replace "\s+"," ")".Trim()
}

## SET NAME AND VERSION IN VSIX Package json
if($vsixName){
  Write-Host
  Write-Host "Setting name and version in VSIX package json"

  if(Test-Path($vsixPackageJson)){
    $packagejsonContent = Get-Content $vsixPackageJson | ConvertFrom-Json
    $LocalIdentity = $packagejsonContent.name
    $localDisplayName = $packagejsonContent.displayName
    $localVersionNumber = $packagejsonContent.version

    Write-Host "Replacing $LocalIdentity by  $vsixName"
    Write-Host "Replacing $localDisplayName by  $vsixDisplayName"
    Write-Host "Replacing $localVersionNumber by  $versionNumber"

    $content = (Get-Content -path $vsixPackageJson -Raw)

    $content = $content -replace "$LocalIdentity" , "$vsixName"
    $content = $content -replace [regex]::Escape("$localDisplayName") , "$vsixDisplayName"
    $content = $content -replace "$localVersionNumber" , "$versionNumber"

    $content | Set-Content -Path $vsixPackageJson

    Write-Host "$resolvedPath - Version, Name & DisplayName applied ($versionNumber, $vsixName, $vsixDisplayName)"
  }
  else{
    throw "No VSIX package json file found."
  }
}
else{
  throw "Identity is mandatory."
}

