const fs = require('fs');

function isSafeReport(report) {
    let isIncreasing = true;
    let isDecreasing = true;

    for (let i = 0; i < report.length - 1; i++) {
        const diff = report[i + 1] - report[i];

        if (diff > 3 || diff < -3 || diff === 0) {
            return false;
        }
        if (diff < 0) isIncreasing = false;
        if (diff > 0) isDecreasing = false;
    }

    return isIncreasing || isDecreasing;
}

function canBeSafeWithDampener(report) {
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafeReport(modifiedReport)) {
            return true;
        }
    }
    return false;
}

function analyzeReports(filePath) {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');

    const paragraphMatch = htmlContent.match(/<p>([\s\S]*?)<\/p>/);
    const paragraphText = paragraphMatch[1];
    const lines = paragraphText
        .replace(/<br>/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);

    let safeWithoutDampener = 0;
    let safeWithDampener = 0;

    lines.forEach(line => {
        const report = line.split(/\s+/).map(Number);
        if (isSafeReport(report)) {
            safeWithoutDampener++;
            safeWithDampener++;
        } else if (canBeSafeWithDampener(report)) {
            safeWithDampener++;
        }
    });

    console.log(`Without Problem Dampener: ${safeWithoutDampener}`);
    console.log(`With Problem Dampener: ${safeWithDampener}`);
}

const inputFilePath = 'Day 2/index.html';
analyzeReports(inputFilePath);
