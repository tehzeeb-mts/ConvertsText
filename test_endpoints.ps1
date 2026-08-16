$pages = @(
    "http://localhost:8080/index.html",
    "http://localhost:8080/recommended-tools.html",
    "http://localhost:8080/blog.html",
    "http://localhost:8080/sentence-case.html",
    "http://localhost:8080/title-case.html",
    "http://localhost:8080/upper-lower-case.html",
    "http://localhost:8080/developer-cases.html",
    "http://localhost:8080/stylized-fancy-text.html",
    "http://localhost:8080/ciphers-encoders.html",
    "http://localhost:8080/text-cleaner-sorter.html",
    "http://localhost:8080/diff-checker.html",
    "http://localhost:8080/word-counter.html",
    "http://localhost:8080/lorem-ipsum.html",
    "http://localhost:8080/text-analyzer.html",
    "http://localhost:8080/markdown-html.html",
    "http://localhost:8080/invisible-text.html",
    "http://localhost:8080/random-generator.html",
    "http://localhost:8080/about.html",
    "http://localhost:8080/contact.html",
    "http://localhost:8080/privacy-policy.html",
    "http://localhost:8080/terms.html",
    "http://localhost:8080/404.html",
    "http://localhost:8080/500.html",
    "http://localhost:8080/robots.txt",
    "http://localhost:8080/sitemap.xml",
    "http://localhost:8080/favicon.svg",
    "http://localhost:8080/css/style.css",
    "http://localhost:8080/js/converters.js",
    "http://localhost:8080/js/readability.js",
    "http://localhost:8080/js/grammar-engine.js",
    "http://localhost:8080/js/morse-audio.js",
    "http://localhost:8080/js/diff-engine.js",
    "http://localhost:8080/js/app.js"
)

$allPassed = $true
foreach ($url in $pages) {
    try {
        $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        Write-Host "[OK] $($res.StatusCode) - $url ($($res.Content.Length) bytes)"
    } catch {
        Write-Host "[FAIL] $url - $($_.Exception.Message)"
        $allPassed = $false
    }
}

if ($allPassed) {
    Write-Host "`nAll 33 pages, Grammar Engine, and assets verified successfully with HTTP 200!"
} else {
    Write-Host "`nSome endpoints failed."
}
