Write-Host "🚀 Setting up Convex environment variables..." -ForegroundColor Cyan
Write-Host ""

# Check if convex deployment exists
$envListResult = pnpm convex env list 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Convex deployment not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run 'pnpm convex dev' first to create a deployment."
    Write-Host "Then run this script again."
    exit 1
}

# Generate auth secret using Python
$SECRET = python -c "import secrets; print(secrets.token_urlsafe(32))"

if (-not $SECRET) {
    Write-Host "⚠️  Warning: Could not generate secret with Python. Using openssl instead..." -ForegroundColor Yellow
    $SECRET = openssl rand -base64 32
}

# Set environment variables
Write-Host "Setting SITE_URL..."
pnpm convex env set SITE_URL http://localhost:5173

Write-Host "Setting BETTER_AUTH_SECRET..."
pnpm convex env set BETTER_AUTH_SECRET $SECRET

Write-Host ""
Write-Host "✅ Convex environment variables configured!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Make sure 'pnpm convex dev' is running (in Terminal 1)"
Write-Host "  2. Run 'pnpm dev' (in Terminal 2)"
Write-Host "  3. Open http://localhost:5173"
