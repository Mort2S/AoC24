const fs = require('fs');

function calculateMulResults(input) {
    const regex = /mul\((\d+),(\d+)\)/g;
    let match;
    let sum = 0;

    while ((match = regex.exec(input)) !== null) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
    }

    return sum;
}

function calculateMulResultsWithConditionals(input) {
    const instructionPattern = /(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;
    let mulEnabled = true;
    let totalSum = 0;

    let match;
    while ((match = instructionPattern.exec(input)) !== null) {
        const [fullMatch, mulMatch, x, y] = match;

        if (fullMatch.startsWith('mul')) {
            if (mulEnabled) {
                totalSum += parseInt(x, 10) * parseInt(y, 10);
            }
        } else if (fullMatch === 'do()') {
            mulEnabled = true;
        } else if (fullMatch === "don't()") {
            mulEnabled = false;
        }
    }

    return totalSum;
}

fs.readFile('Day 3/text.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    const resultPartOne = calculateMulResults(data);
    const resultPartTwo = calculateMulResultsWithConditionals(data);

    console.log("Part One:", resultPartOne);
    console.log("Part Two:", resultPartTwo);
});
