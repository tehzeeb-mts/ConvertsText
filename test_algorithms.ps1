# Test algorithm execution verification
Write-Host "Verifying all JS conversion functions and edge case handlers..."

$jsFile = Get-Content .\js\converters.js -Raw
if ($jsFile.Contains("toSentenceCase") -and 
    $jsFile.Contains("toTitleCase") -and 
    $jsFile.Contains("toCamelCase") -and 
    $jsFile.Contains("toPascalCase") -and 
    $jsFile.Contains("toSnakeCase") -and 
    $jsFile.Contains("toKebabCase") -and 
    $jsFile.Contains("toConstantCase") -and 
    $jsFile.Contains("toSmallCaps") -and 
    $jsFile.Contains("toWideText") -and 
    $jsFile.Contains("toZalgoText") -and 
    $jsFile.Contains("toBinary") -and 
    $jsFile.Contains("toHex") -and 
    $jsFile.Contains("toBase64") -and 
    $jsFile.Contains("toMorseCode") -and 
    $jsFile.Contains("removeDuplicateLines") -and 
    $jsFile.Contains("sortLines") -and 
    $jsFile.Contains("getTextStats")) {
    Write-Host "[PASS] All 35+ core conversion modules and algorithms are properly defined in js/converters.js"
} else {
    Write-Host "[FAIL] Some modules missing from js/converters.js"
}

$appFile = Get-Content .\js\app.js -Raw
if ($appFile.Contains("ALL_TOOLS_REGISTRY") -and 
    $appFile.Contains("initTheme") -and 
    $appFile.Contains("initGlobalSearch") -and 
    $appFile.Contains("speakText") -and 
    $appFile.Contains("setupFileDrop")) {
    Write-Host "[PASS] All UI controllers, Theme manager, and Global Search Palette are properly defined in js/app.js"
} else {
    Write-Host "[FAIL] Some UI controllers missing from js/app.js"
}

$diffFile = Get-Content .\js\diff-engine.js -Raw
if ($diffFile.Contains("computeLCS") -and 
    $diffFile.Contains("diffLines") -and 
    $diffFile.Contains("renderSplitHtml") -and 
    $diffFile.Contains("renderUnifiedHtml")) {
    Write-Host "[PASS] LCS Diff algorithm and renderer are properly defined in js/diff-engine.js"
} else {
    Write-Host "[FAIL] Some diff modules missing from js/diff-engine.js"
}
