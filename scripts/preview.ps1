param(
    [ValidateRange(1024, 65535)]
    [int]$Port = 4000,
    [switch]$BuildOnly
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$WorkspaceRoot = Split-Path -Parent $ProjectRoot
$RuntimeEntry = Join-Path $WorkspaceRoot '.local-work\runtime\Invoke-JRuby.ps1'
Set-Location -LiteralPath $ProjectRoot
$BaseurlSetting = Select-String -LiteralPath (Join-Path $ProjectRoot '_config.yml') -Pattern '^baseurl:\s*"([^"]*)"' | Select-Object -First 1
$PreviewBasePath = if ($BaseurlSetting) { $BaseurlSetting.Matches[0].Groups[1].Value.TrimEnd('/') } else { '' }

if ($BuildOnly) {
    $JekyllArguments = @('build', '--trace')
} else {
    Write-Host ''
    Write-Host "Local preview: http://127.0.0.1:$Port$PreviewBasePath/" -ForegroundColor Cyan
    Write-Host 'Wait for the Jekyll server-ready message, then open the address.'
    Write-Host 'Press Ctrl+C to stop. This command does not publish anything.'
    Write-Host ''
    $JekyllArguments = @('serve', '--host', '127.0.0.1', '--port', "$Port", '--force_polling')
}

if (Test-Path -LiteralPath $RuntimeEntry -PathType Leaf) {
    & powershell -NoProfile -ExecutionPolicy Bypass -File $RuntimeEntry -S bundle exec jekyll @JekyllArguments
    exit $LASTEXITCODE
}

if (Get-Command bundle -ErrorAction SilentlyContinue) {
    & bundle exec jekyll @JekyllArguments
    exit $LASTEXITCODE
}

throw 'Ruby/Bundler was not found. See README.md for the Windows setup instructions.'
