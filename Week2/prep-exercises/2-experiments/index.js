"use strict";

function runExperiment(sampleSize) {
  const valueCounts = [0, 0, 0, 0, 0, 0];

  // Write a for loop that iterates `sampleSize` times
  for (let i = 0; i < sampleSize; i++) {
    // Generate a random integer between 1 and 6 (inclusive)
    const randomValue = Math.floor(Math.random() * 6) + 1;

    // Increment the count for the corresponding value
    valueCounts[randomValue - 1]++;
  }

  const results = [];

  // Write a for..of loop for the `valueCounts` array
  for (const count of valueCounts) {
    // Compute the percentage of how many times that value was thrown
    const percentage = ((count / sampleSize) * 100).toFixed(2);

    // Push the percentage string onto the `results` array
    results.push(percentage);
  }

  return results;
}

function main() {
  const sampleSizes = [100, 1000, 1000000];

  // Write a for..of loop that calls `runExperiment()` for each value
  for (const size of sampleSizes) {
    const results = runExperiment(size);
    console.log(results, size);
  }
}

main();