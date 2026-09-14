Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630

$bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# 1. Fill background with clean off-white
$bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 252, 252, 252))
$graphics.FillRectangle($bgBrush, 0, 0, $width, $height)

# 2. Load and draw the Saturn V rocket on the right side
$apolloPath = Join-Path (Get-Location) "public\apollo11.jpg"
if (Test-Path $apolloPath) {
    $rocketImg = [System.Drawing.Image]::FromFile($apolloPath)
    
    # Target rect for rocket on the right
    $rocketWidth = 720
    $rocketHeight = 630
    $destRect = New-Object System.Drawing.Rectangle(520, 0, $rocketWidth, $rocketHeight)
    
    # Draw rocket image with grayscale matrix and slight transparency
    $ia = New-Object System.Drawing.Imaging.ImageAttributes
    $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix
    # Grayscale conversion matrix with 0.55 opacity
    $colorMatrix.Matrix00 = 0.299 * 0.50
    $colorMatrix.Matrix01 = 0.299 * 0.50
    $colorMatrix.Matrix02 = 0.299 * 0.50
    $colorMatrix.Matrix10 = 0.587 * 0.50
    $colorMatrix.Matrix11 = 0.587 * 0.50
    $colorMatrix.Matrix12 = 0.587 * 0.50
    $colorMatrix.Matrix20 = 0.114 * 0.50
    $colorMatrix.Matrix21 = 0.114 * 0.50
    $colorMatrix.Matrix22 = 0.114 * 0.50
    $colorMatrix.Matrix33 = 0.50 # Alpha
    $colorMatrix.Matrix44 = 1.0
    $ia.SetColorMatrix($colorMatrix)
    
    $graphics.DrawImage($rocketImg, $destRect, 0, 0, $rocketImg.Width, $rocketImg.Height, [System.Drawing.GraphicsUnit]::Pixel, $ia)
    $rocketImg.Dispose()
    
    # 3. Apply soft gradient fade from left to right over the rocket
    $fadeBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.PointF(480, 0)),
        (New-Object System.Drawing.PointF(900, 0)),
        [System.Drawing.Color]::FromArgb(255, 252, 252, 252),
        [System.Drawing.Color]::FromArgb(0, 252, 252, 252)
    )
    $graphics.FillRectangle($fadeBrush, 480, 0, 450, $height)
    $fadeBrush.Dispose()
}

# 4. Text content on the left
$tagFont = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font("Georgia", 42, [System.Drawing.FontStyle]::Bold)
$subFont = New-Object System.Drawing.Font("Georgia", 16, [System.Drawing.FontStyle]::Regular)
$bodyFont = New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Regular)
$boldBodyFont = New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Bold)
$urlFont = New-Object System.Drawing.Font("Consolas", 12, [System.Drawing.FontStyle]::Regular)

$tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 113, 113, 122))
$titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 23, 23, 23))
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 82, 82, 91))
$bodyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 100, 100, 105))
$darkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 30, 30, 30))

$leftMargin = 85

# Aerospace tag
$graphics.DrawString("APOLLO 11 • SATURN V", $tagFont, $tagBrush, $leftMargin, 85)

# Main Name
$graphics.DrawString("Austin Zilincik", $titleFont, $titleBrush, $leftMargin, 125)

# Subtitle
$graphics.DrawString("Software Engineer & Systems Developer", $subFont, $subBrush, $leftMargin, 205)

# Divider line
$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 228, 228, 231), 1)
$graphics.DrawLine($linePen, $leftMargin, 260, 560, 260)

# Bio Statements
$graphics.DrawString("Software should be durable, efficient, and built with intention.", $bodyFont, $bodyBrush, $leftMargin, 285)
$graphics.DrawString("Quality is about what you refine, not how much you add.", $bodyFont, $bodyBrush, $leftMargin, 315)
$graphics.DrawString("I build software engineered with precision, discipline, and purpose.", $boldBodyFont, $darkBrush, $leftMargin, 360)

# Projects badge list
$graphics.DrawString("Projects: LR-Compiler  ·  Tesla-USB  ·  PhotoLocator  ·  Stock-Predictor", $bodyFont, $tagBrush, $leftMargin, 430)

# Live domain URL at the bottom
$graphics.DrawString("https://austinz2428.github.io/Portfolio/", $urlFont, $darkBrush, $leftMargin, 510)

# Clean border around image
$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 228, 228, 231), 2)
$graphics.DrawRectangle($borderPen, 1, 1, $width - 2, $height - 2)

# Save
$outputPath = Join-Path (Get-Location) "public\og-image.png"
$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Successfully generated $outputPath (1200x630)"
