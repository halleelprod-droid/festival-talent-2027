[CmdletBinding()]
param(
  [string]$OutputDirectory = "C:\FestivalTalentData\backups",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$allowedDatabases = @("festival_talent_dev", "festival_talent_test")
$forbiddenNames = @("prod", "production", "festival_talent_prod", "festival_talent_production")

if (-not $env:DATABASE_URL) { throw "DATABASE_URL is required." }
try { $connection = [Uri]$env:DATABASE_URL } catch { throw "DATABASE_URL is invalid." }
$database = $connection.AbsolutePath.TrimStart('/')
if ($connection.Host -notin @("localhost", "127.0.0.1")) { throw "Only a local PostgreSQL server is allowed." }
if ($database -in $forbiddenNames -or $database -notin $allowedDatabases) { throw "Database is not authorized for local backup." }

$pgDumpCommand = Get-Command pg_dump.exe -ErrorAction SilentlyContinue
$pgDump = if ($pgDumpCommand) { $pgDumpCommand.Source } else { $null }
if (-not $pgDump) { $pgDump = "C:\Program Files\PostgreSQL\18\bin\pg_dump.exe" }
if (-not (Test-Path -LiteralPath $pgDump)) { throw "pg_dump 18 is required." }

$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-dd_HH-mm-ss")
$destination = Join-Path $OutputDirectory "${database}_${timestamp}.dump"
if (Test-Path -LiteralPath $destination) { throw "Refusing to overwrite an existing backup." }

if ($DryRun) {
  Write-Output "DRY-RUN: local custom-format backup"
  Write-Output "Database: $database"
  Write-Output "Destination directory: $OutputDirectory"
  exit 0
}

[System.IO.Directory]::CreateDirectory($OutputDirectory) | Out-Null
$previousPassword = $env:PGPASSWORD
try {
  $env:PGPASSWORD = [Uri]::UnescapeDataString($connection.UserInfo.Split(':', 2)[1])
  $arguments = @(
    "--host=$($connection.Host)",
    "--port=$(if ($connection.Port -gt 0) { $connection.Port } else { 5432 })",
    "--username=$($connection.UserInfo.Split(':', 2)[0])",
    "--dbname=$database",
    "--format=custom",
    "--file=$destination"
  )
  & $pgDump @arguments
  if ($LASTEXITCODE -ne 0) { throw "pg_dump failed." }
} finally {
  if ($null -eq $previousPassword) { Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue }
  else { $env:PGPASSWORD = $previousPassword }
}

$file = Get-Item -LiteralPath $destination
if ($file.Length -le 0) { throw "Backup file is empty." }
Write-Output "Backup completed."
Write-Output "Database: $database"
Write-Output "File: $($file.Name)"
Write-Output "Size: $($file.Length) bytes"
