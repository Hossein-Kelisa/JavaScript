
/**
 * Credit to https://adventofcode.com/ for this exercise
 * 
 * Each object in the passwordList gives a password policy and then the password.
 * The times field says the minimal and maximal amount of times the letter should be in the password. So 1-3 means at least 1 time, at most 3 times.
 * The letter field gives which letter should be counted
 * The password field gives the password
 * 
 * In the list 2 passwords are valid, the middle one is not as there is no b in the password.
 * 
 * We expect the output:
 * 
 * 'abcde' is VALID, a is present 1 times and should have been present at least 1 and at most 3 times
 * 'cdefg' is INVALID, b is present 0 times and should have been present at least 1 and at most 3 times
 * 'ccccccccc' is VALID, c is present 9 times and should have been present at least 2 and at most 9 times
 */

const passwordList = [
    { times: '1-3', letter: 'a', password: 'abcde'},
    { times: '1-3', letter: 'b', password: 'cdefg'},
    { times: '2-9', letter: 'c', password: 'ccccccccc'}
];

for (const entry of passwordList) {
    const [min, max] = entry.times.split('-').map(Number);
    const letter = entry.letter;
    const password = entry.password;

    const letterCount = [...password].filter(char => char === letter).length;

    const isValid = letterCount >= min && letterCount <= max;

    if (isValid) {
        console.log(`'${password}' is VALID, ${letter} is present ${letterCount} times and should have been present at least ${min} and at most ${max} times`);
    } else {
        console.log(`'${password}' is INVALID, ${letter} is present ${letterCount} times and should have been present at least ${min} and at most ${max} times`);
    }
}