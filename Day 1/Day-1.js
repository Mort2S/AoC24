const fs = require('fs');

const htmlContent = fs.readFileSync('Day 1/index.html', 'utf-8');
const pairs = htmlContent.match(/\d+\s+\d+/g);

const leftList = [];
const rightList = [];

pairs.forEach(pair => {
  const [left, right] = pair.split(/\s+/).map(Number);
  leftList.push(left);
  rightList.push(right);
});

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let totalDistance = 0;
for (let i = 0; i < leftList.length; i++) {
  totalDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log('Distance:', totalDistance);

// Part 2
const countMap = {};
rightList.forEach(num => {
  countMap[num] = (countMap[num] || 0) + 1;
});

let similarityScore = 0;
leftList.forEach(num => {
  const countInRight = countMap[num] || 0; 
  similarityScore += num * countInRight;
});

console.log("Similarity Score:", similarityScore);
