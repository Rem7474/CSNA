# Script PowerShell pour convertir quizz.csv en questions.json
# Utilisation : .\convert.ps1
# Ce script convertit le fichier CSV CSNA en format JSON avec conversion 1-indexed vers 0-indexed

Write-Host "Conversion du fichier quizz.csv vers questions.json..." -ForegroundColor Cyan

$csvContent = Get-Content -Path "quizz.csv" -Encoding Default
$questions = @()
$questionId = 1

foreach ($line in $csvContent) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    
    $parts = $line -split ';'
    
    if ($parts.Length -lt 4) { continue }
    
    $questionText = $parts[0]
    $questionType = if ($parts[1] -eq '1') { 'text' } else { 'image' }
    $numAnswers = [int]$parts[2]
    $numCorrect = [int]$parts[3]
    
    # Extraire les réponses
    $answers = @()
    for ($i = 4; $i -lt (4 + $numAnswers); $i++) {
        if ($i -lt $parts.Length -and ![string]::IsNullOrWhiteSpace($parts[$i])) {
            $answers += $parts[$i].Trim()
        }
    }
    
    # Extraire les indices des réponses correctes (convertir de 1-indexed à 0-indexed)
    $correctAnswers = @()
    for ($i = (4 + $numAnswers); $i -lt (4 + $numAnswers + $numCorrect); $i++) {
        if ($i -lt $parts.Length -and ![string]::IsNullOrWhiteSpace($parts[$i])) {
            $idx = [int]$parts[$i] - 1  # Convertir en 0-indexed
            if ($idx -ge 0 -and $idx -lt $answers.Length) {
                $correctAnswers += $idx
            }
        }
    }
    
    # Extraire l'URL de l'image si elle existe
    $imageIndex = 4 + $numAnswers + $numCorrect
    $imageUrl = $null
    if ($questionType -eq 'image' -and $imageIndex -lt $parts.Length -and ![string]::IsNullOrWhiteSpace($parts[$imageIndex])) {
        $imageUrl = $parts[$imageIndex].Trim()
    }
    
    # Créer l'objet question
    $questionObj = [PSCustomObject]@{
        id = $questionId
        question = $questionText
        type = $questionType
        answers = $answers
        correctAnswers = $correctAnswers
        image = $imageUrl
    }
    
    $questions += $questionObj
    $questionId++
}

# Créer l'objet de sortie
$output = [PSCustomObject]@{
    questions = $questions
}

# Convertir en JSON et sauvegarder
$jsonOutput = $output | ConvertTo-Json -Depth 10
$jsonOutput | Out-File -FilePath "questions.json" -Encoding UTF8

Write-Host "✓ Conversion terminée : $($questions.Length) questions converties" -ForegroundColor Green
Write-Host "✓ Fichier questions.json créé avec succès" -ForegroundColor Green
