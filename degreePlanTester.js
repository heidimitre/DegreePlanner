var DegreePlan = require('./degreePlan');
var Course = require('./course');
var writePlan = require('./writePlan');

var plan = new DegreePlan('Computer Science');

plan.addCourse("CSE 110", "Principles of Programming with Java", 3);
plan.addCourse("CSE 205", "Object-Oriented Programming and Data Structures", 3);
plan.addCourse("CSE 120", "Digital Design Fundamentals", 3);
plan.addCourse("CSE 230", "Computer Organization and Assembly Language Programming", 3);
plan.addCourse("CSE 240", "Introduction to Programming Languages", 3);
plan.addCourse("CSE 310", "Data Structures and Algorithms", 3);
plan.addCourse("CSE 360", "Introduction to Software Engineering", 3);
plan.addCourse("CSE 340", "Principles of Programming Languages", 3);
plan.addCourse("CSE 355", "Introduction to Theoretical Computer Science", 3);
plan.addCourse("CSE 430", "Operating Systems", 3);

writePlan(plan);
