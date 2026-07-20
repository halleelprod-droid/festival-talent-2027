[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$BackupFile,
  [switch]$ConfirmRestore,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$requiredDatabase = "festival_talent_restore_test"
$forbiddenNames = @("prod", "production", "festival_talent_prod", "festival_talent_production", "festival_talent_dev", "festival_talent_test")

if (-not $env:DATABASE_URL) { throw "DATABASE_URL is required." }
try { $connection = [Uri]$env:DATABASE_URL } catch { throw "DATABASE_URL is invalid." }
$database = $connection.AbsolutePath.TrimStart('/')
if ($connection.Host -notin @("localhost", "127.0.0.1")) { throw "Only a local PostgreSQL server is allowed." }
if ($database -in $forbiddenNames -or $database -ne $requiredDatabase) { throw "Restore target must be festival_talent_restore_test." }
if (-not (Test-Path -LiteralPath $BackupFile -PathType Leaf)) { throw "Backup file does not exist." }

$pgRestoreCommand = Get-Command pg_restore.exe -ErrorAction SilentlyContinue
$pgRestore = if ($pgRestoreCommand) { $pgRestoreCommand.Source } else { $null }
if (-not $pgRestore) { $pgRestore = "C:\Program Files\PostgreSQL\18\bin\pg_restore.exe" }
if (-not (Test-Path -LiteralPath $pgRestore)) { throw "pg_restore 18 is required." }

if ($DryRun) {
  Write-Output "DRY-RUN: local restore"
  Write-Output "Target: $database"
  Write-Output "Backup file: $([System.IO.Path]::GetFileName($BackupFile))"
  exit 0
}
if (-not $ConfirmRestore) { throw "Restore requires -ConfirmRestore." }

$previousPassword = $env:PGPASSWORD
try {
  $env:PGPASSWORD = [Uri]::UnescapeDataString($connection.UserInfo.Split(':', 2)[1])
  $arguments = @(
    "--host=$($connection.Host)",
    "--port=$(if ($connection.Port -gt 0) { $connection.Port } else { 5432 })",
    "--username=$($connection.UserInfo.Split(':', 2)[0])",
    "--dbname=$database",
    "--clean",
    "--if-exists",
    "--no-owner",
    $BackupFile
  )
  & $pgRestore @arguments
  if ($LASTEXITCODE -ne 0) { throw "pg_restore failed." }
} finally {
  if ($null -eq $previousPassword) { Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue }
  else { $env:PGPASSWORD = $previousPassword }
}

Write-Output "Restore completed."
Write-Output "Target: $database"
