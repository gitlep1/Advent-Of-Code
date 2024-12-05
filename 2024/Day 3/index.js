const fs = require("fs");
const mulRegex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;
const mult = fs.readFileSync("data.txt", "utf-8").match(mulRegex);

const multiply = (num1, num2) => {
  return num1 * num2;
};

const fixCorruption = (arr) => {
  const numRegex = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/;
  let total = 0;

  arr.map((e) => {
    const match = e.match(numRegex);
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);

    return (total += multiply(num1, num2));
  });

  return total;
};

console.log(fixCorruption(mult));

const mulRegex2 = /mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)|do\(\)|don\'t\(\)/g;
const mult2 = fs.readFileSync("data.txt", "utf-8").match(mulRegex2);

const fixCorruption2 = (arr) => {
  let total = 0;
  let doFlag = true;

  arr.forEach((e) => {
    if (e.match(/do\(\)/)) {
      doFlag = true;
    } else if (e.match(/don\'t\(\)/)) {
      doFlag = false;
    }

    if (doFlag && e.match(/mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/)) {
      const match = e.match(/mul\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
      const num1 = parseInt(match[1]);
      const num2 = parseInt(match[2]);
      total += multiply(num1, num2);
    }
  });

  return total;
};

console.log(fixCorruption2(mult2));
