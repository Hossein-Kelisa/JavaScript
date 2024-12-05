//import { modules, students, mentors, classes } from "./hyf.js";
//I removed modules, students, classes from the import
//according to YAGNI (You Aren't Gonna Need It)
import { mentors } from "./hyf.js";

/**
 * Tjebbe would like help to get a list of possible mentors for a module.
 * Fill in this function that finds all the mentors that can teach the given module.
 *
 * It should return an array of names. So something like:
 *  ['John', 'Mary']
 */
const possibleMentorsForModule = (moduleName) => {
  return mentors
    .filter(mentor => mentor.canTeach.includes(moduleName))
    .map(mentor => mentor.name);
};
// You can uncomment out this line to try your function
console.log(possibleMentorsForModule('javascript'));

/**
 * Tjebbe wants to make it even easier for himself.
 * Fill in this function that chooses a random mentor to teach the given module.
 *
 * It should return a single name.
 */
const findMentorForModule = (moduleName) => {
  const possibleMentors = possibleMentorsForModule(moduleName);
  
  console.log("Possible Mentors:", possibleMentors);

  if (possibleMentors.length > 0) {
    const randomIndex = Math.floor(Math.random() * possibleMentors.length);
    
    console.log("Random Index:", randomIndex, "PossibleMentors Length:", possibleMentors.length);

    return possibleMentors[randomIndex];
  }
  return null; 
};
// You can uncomment out this line to try your function
console.log(findMentorForModule('javascript'));