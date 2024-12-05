const fs = require("fs");
const nums = fs.readFileSync("./data.txt", "utf-8");
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

const sortArrays = (arr) => {
  return (sortedArr = arr.sort((a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }));
};

const calcNumberDistance = (num1, num2) => {
  const biggestNum = Math.max(num1, num2);
  const smallestNum = Math.min(num1, num2);
  return biggestNum - smallestNum;
};

const totalListsDistance = (arr1, arr2, total = 0) => {
  const sortedArr1 = sortArrays(arr1);
  const sortedArr2 = sortArrays(arr2);

  const index1 = sortedArr1.indexOf(sortedArr1[0]);
  const index2 = sortedArr2.indexOf(sortedArr2[0]);

  if (sortedArr1.length === 0) {
    return total;
  }

  const distance = calcNumberDistance(sortedArr1[0], sortedArr2[0]);

  total += distance;

  sortedArr1.splice(index1, 1);
  sortedArr2.splice(index2, 1);

  return totalListsDistance(sortedArr1, sortedArr2, total);
};

console.log({ totalListsDistance: totalListsDistance(list1, list2) });

const countSimilarNums = (arr1, arr2) => {
  const simObj = {};
  let result = 0;

  for (const num1 of arr1) {
    for (const num2 of arr2) {
      if (num2 === num1) {
        simObj[num1] = (simObj[num1] || 0) + 1;
      }
    }
  }

  const multiArr = [];

  for (const [key, value] of Object.entries(simObj)) {
    multiArr.push(Number(key) * value);
  }

  multiArr.forEach((e) => {
    result += e;
  });

  return result;
};

console.log({ countSimilarNums: countSimilarNums(list1, list2) });
