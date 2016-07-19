var DegreePlan = require('./degreePlan');
var Course = require('./course');
var fs = require('fs');

var plan = new DegreePlan('Computer Science');

var CSE110 = new Course("CSE 110", "Principles of Programming with Java", 3);
var CSE205 = new Course("CSE 205", "Object-Oriented Programming and Data Structures", 3);
var CSE120 = new Course("CSE 120", "Digital Design Fundamentals", 3);
var CSE230 = new Course("CSE 230", "Computer Organization and Assembly Language Programming", 3);
var CSE240 = new Course("CSE 240", "Introduction to Programming Languages", 3);
var CSE310 = new Course("CSE 310", "Data Structures and Algorithms", 3);
var CSE360 = new Course("CSE 360", "Introduction to Software Engineering", 3);
var CSE340 = new Course("CSE 340", "Principles of Programming Languages", 3);
var CSE355 = new Course("CSE 355", "Introduction to Theoretical Computer Science", 3);
var CSE430 = new Course("CSE 430", "Operating Systems", 3);

plan.addCourse(CSE110);
plan.addCourse(CSE205);
plan.addCourse(CSE120);
plan.addCourse(CSE230);
plan.addCourse(CSE240);
plan.addCourse(CSE310);
plan.addCourse(CSE360);
plan.addCourse(CSE340);
plan.addCourse(CSE355);
plan.addCourse(CSE430);

fs.writeFile('degree_plan.txt', plan.courseList, function(err){
  if(err){
    return console.log(err);
  }

  console.log("File saved as degree_plan.txt");
});
