$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Server running on http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($localPath)) { $localPath = 'index.html' }
        
        $filePath = Join-Path $PSScriptRoot $localPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            
            $mime = switch ($ext) {
                '.html' { 'text/html; charset=utf-8' }
                '.css'  { 'text/css; charset=utf-8' }
                '.js'   { 'application/javascript; charset=utf-8' }
                '.json' { 'application/json; charset=utf-8' }
                '.svg'  { 'image/svg+xml' }
                '.png'  { 'image/png' }
                '.ico'  { 'image/x-icon' }
                '.txt'  { 'text/plain; charset=utf-8' }
                '.xml'  { 'application/xml; charset=utf-8' }
                default { 'application/octet-stream' }
            }
            
            $response.ContentType = $mime
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $err404Path = Join-Path $PSScriptRoot "404.html"
            if (Test-Path $err404Path -PathType Leaf) {
                $content = [System.IO.File]::ReadAllBytes($err404Path)
                $response.ContentType = 'text/html; charset=utf-8'
                $response.ContentLength64 = $content.Length
                $response.OutputStream.Write($content, 0, $content.Length)
            } else {
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.ContentType = 'text/plain; charset=utf-8'
                $response.ContentLength64 = $msg.Length
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
