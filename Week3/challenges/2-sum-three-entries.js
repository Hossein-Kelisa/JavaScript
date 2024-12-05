/**
 * Credit to https://adventofcode.com/ for this exercise

In the list below you have an array of numbers. The goal is to find the three numbers that add up to 2020.

Once you have found those numbers, multiply the numbers and store the result of that in the result variable.
 */


const list = [1721, 979, 366, 299, 675, 1456];
let result;
    
// Write your code here
for (let i = 0; i < list.length - 2; i++) {
    const complements = new Set();
    const target = 2020 - list[i];
  
    for (let j = i + 1; j < list.length; j++) {
      const complement = target - list[j];
      if (complements.has(complement)) {
        result = list[i] * list[j] * complement;
        break;
      }
      complements.add(list[j]);
    }
  
    if (result) break;
}

if (result) console.log(result);

// TEST CODE, do not change
console.assert(result === 241861950, `The result is not correct, it is ${result}, but should be 241861950`);