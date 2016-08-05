var courses = require('./resources/degreePlan.json');
var relationships = require('./resources/relationships.json');
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
  plan.addCourse(course.number, course.title, course.creditHours);
};

function makeRelationships(relationshipsList){
  relationshipsList.forEach(function(relationship){
    plan.addPrerequisite(relationship.courseNumber, relationship.prerequisiteNumber);
  });
};

createPlan(courses.list);
makeRelationships(relationships.list);
plan.createPlan();
writePlan(plan);
