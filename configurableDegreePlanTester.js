var courses = require('./resources/degreePlan.json');
var DegreePlan = require('./degreePlan');
var Course = require('./course');
var writePlan = require('./writePlan');

var plan = new DegreePlan(courses.name);

function createPlan(list){
  list.forEach(function(course){
    addNewCourse(course);
  });
};

function addNewCourse(course){
  var newCourse = new Course(course.number, course.title, course.creditHours);
  plan.addCourse(newCourse);
};

createPlan(courses.list);
writePlan(plan);
