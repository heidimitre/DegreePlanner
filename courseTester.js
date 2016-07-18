var Course = require('./course');

var firstCourse = new Course("CSE 110", "Intro to Java", 3);
var secondCourse = new Course("CSE 205", "Object Oriented Programming", 3);

console.log(firstCourse.toString());
console.log(secondCourse.toString());

console.log(secondCourse.checkPrerequisite(firstCourse));
console.log(secondCourse.addPrerequisite(firstCourse));
console.log(secondCourse.displayPrerequisites());


console.log(secondCourse.checkPrerequisite(firstCourse));
console.log(secondCourse.addPrerequisite(firstCourse));
console.log(secondCourse.displayPrerequisites());

console.log(secondCourse.checkPrerequisite(firstCourse));
console.log(secondCourse.removePrerequisite(firstCourse));
console.log(secondCourse.displayPrerequisites());
