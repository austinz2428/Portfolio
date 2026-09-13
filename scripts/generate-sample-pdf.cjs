const fs = require('fs');
const path = require('path');

function createSampleResumePdf() {
  const lines = [
    "%PDF-1.4",
    "%âãÏÓ",
    "1 0 obj",
    "<< /Type /Catalog /Pages 2 0 R >>",
    "endobj",
    "2 0 obj",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "endobj",
    "3 0 obj",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "endobj",
    "4 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    "endobj",
    "5 0 obj",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "endobj"
  ];

  const streamContent = [
    "BT",
    "/F1 22 Tf 50 730 Td (AUSTIN ZILINCIK) Tj",
    "0 -22 Td",
    "/F2 10 Tf (Email: austinzilincik@oakland.edu  |  GitHub: github.com/austinz2428  |  Michigan) Tj",
    "0 -25 Td",
    "/F1 13 Tf (EDUCATION) Tj",
    "0 -16 Td",
    "/F1 10 Tf (Oakland University - Rochester, MI) Tj",
    "0 -13 Td",
    "/F2 10 Tf (Bachelor of Science in Computer Science) Tj",
    "0 -13 Td",
    "/F2 9 Tf (Coursework: Data Structures, Algorithms, Compilers, Systems Programming, Computer Architecture) Tj",
    "0 -25 Td",
    "/F1 13 Tf (TECHNICAL SKILLS) Tj",
    "0 -15 Td",
    "/F2 10 Tf (Languages: C++, Python, JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL) Tj",
    "0 -13 Td",
    "(Frameworks & Tools: React, Node.js, Tailwind CSS, Git/GitHub, Linux / Shell, Docker) Tj",
    "0 -25 Td",
    "/F1 13 Tf (PROJECTS & EXPERIENCE) Tj",
    "0 -18 Td",
    "/F1 11 Tf (LR-Compiler  |  C++, Systems Programming) Tj",
    "0 -13 Td",
    "/F2 10 Tf (- Implemented an LR parser and compiler handling syntax analysis, tokenization, and code translation.) Tj",
    "0 -13 Td",
    "/F2 10 Tf (- Handled formal grammar evaluations, shift-reduce conflict resolution, and AST generation.) Tj",
    "0 -20 Td",
    "/F1 11 Tf (Tesla-USB Utility  |  Python, Automation) Tj",
    "0 -13 Td",
    "/F2 10 Tf (- Developed Python automation scripts and drive management utilities for automotive storage devices.) Tj",
    "0 -13 Td",
    "/F2 10 Tf (- Streamlined partition configuration and data synchronization protocols.) Tj",
    "0 -20 Td",
    "/F1 11 Tf (Stock-Predictor  |  Python, Machine Learning) Tj",
    "0 -13 Td",
    "/F2 10 Tf (- Constructed predictive models analyzing financial time-series and volatility trends.) Tj",
    "0 -13 Td",
    "/F2 10 Tf (- Processed historical market indicators and evaluated regression forecasting metrics.) Tj",
    "0 -20 Td",
    "/F1 11 Tf (Developer Portfolio & Web Applications  |  React, Vite, Tailwind CSS) Tj",
    "0 -13 Td",
    "/F2 10 Tf (- Built responsive web platforms and developer tooling with live GitHub API integration.) Tj",
    "ET"
  ].join("\n");

  const streamLength = Buffer.byteLength(streamContent, 'utf8');

  const obj6 = [
    "6 0 obj",
    `<< /Length ${streamLength} >>`,
    "stream",
    streamContent,
    "endstream",
    "endobj"
  ].join("\n");

  // Calculate byte offsets
  const objects = [
    lines.slice(0, 2).join("\n") + "\n",
    lines.slice(2, 5).join("\n") + "\n",
    lines.slice(5, 8).join("\n") + "\n",
    lines.slice(8, 11).join("\n") + "\n",
    lines.slice(11, 14).join("\n") + "\n",
    lines.slice(14, 17).join("\n") + "\n",
    obj6 + "\n"
  ];

  let currentOffset = objects[0].length;
  const offsets = [0];
  offsets.push(currentOffset); // obj 1
  currentOffset += objects[1].length;
  offsets.push(currentOffset); // obj 2
  currentOffset += objects[2].length;
  offsets.push(currentOffset); // obj 3
  currentOffset += objects[3].length;
  offsets.push(currentOffset); // obj 4
  currentOffset += objects[4].length;
  offsets.push(currentOffset); // obj 5
  currentOffset += objects[5].length;
  offsets.push(currentOffset); // obj 6
  currentOffset += objects[6].length;

  const xrefOffset = currentOffset;

  let xref = "xref\n0 7\n0000000000 65535 f \n";
  for (let i = 1; i <= 6; i++) {
    xref += String(offsets[i]).padStart(10, '0') + " 00000 n \n";
  }

  const trailer = [
    "trailer",
    "<< /Size 7 /Root 1 0 R >>",
    "startxref",
    xrefOffset,
    "%%EOF"
  ].join("\n");

  const fullPdf = objects.join("") + xref + trailer;

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), fullPdf, 'binary');
  console.log('Successfully regenerated public/resume.pdf for Austin Zilincik');
}

createSampleResumePdf();
