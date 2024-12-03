const fs = require("fs");
const reports = fs
  .readFileSync("data.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(" ").map(Number));

const isSafe = (report) => {
  let isAscending = true;
  for (let i = 1; i < report.length; i++) {
    if (report[i] - report[i - 1] < 1 || report[i] - report[i - 1] > 3) {
      isAscending = false;
      break;
    }
  }

  let isDescending = true;
  for (let i = 1; i < report.length; i++) {
    if (report[i - 1] - report[i] < 1 || report[i - 1] - report[i] > 3) {
      isDescending = false;
      break;
    }
  }

  return isAscending || isDescending;
};

const totalSafeReports = () => {
  let results = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      results++;
    } else {
      for (let i = 0; i < report.length; i++) {
        const newReport = [...report.slice(0, i), ...report.slice(i + 1)];
        if (isSafe(newReport)) {
          results++;
          break;
        }
      }
    }
  }

  return results;
};

console.log(totalSafeReports(reports));
