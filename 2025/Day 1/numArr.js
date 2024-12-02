const fs = require("fs");

const nums = fs.readFileSync("./numbers.txt", "utf-8");

const lines = nums.split("\n");

const list1 = [];
const list2 = [];

lines.forEach((line) => {
  if (line.trim()) {
    const [num1, num2] = line.split(/\s+/).map(Number);
    list1.push(num1);
    list2.push(num2);
  }
});

module.exports = { list1, list2 };
