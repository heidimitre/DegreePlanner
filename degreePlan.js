var Course = require('./course');

var DegreePlan = function(name){
  this.name = name;
  this.courseList = [];
};

//Checks if course is already in array
//Returns 1 if course is in array, 0 if not
DegreePlan.prototype.checkCourse = function(courseNumber){
  for (var i = 0; i < this.courseList.length; i++){
    if (courseNumber === this.courseList[i].number)
      return 1;
  }
  return 0;
};

//Checks if course is already in the array
//Returns 1 if added to courseList, 0 if already in array
DegreePlan.prototype.addCourse = function(courseNumber, courseTitle, creditHours){
  if(this.checkCourse(courseNumber) === 0){
    var addCourse = new Course(courseNumber, courseTitle, creditHours);
    this.courseList.push(addCourse);
    return 1;
  }
  return 0;
};

//Checks if course is in the array
//Returns 1 if removed, 0 if not removed
DegreePlan.prototype.removeCourse = function(courseNumber){
  if(this.checkCourse(courseNumber) === 1){
        for (var i = 0; i < this.courseList.length; i++){
          if (courseNumber === this.courseList[i].number)
            this.courseList.splice(i,1);
            return 1;
        }
  }
  return 0;
};

DegreePlan.prototype.findCourse = function(courseNumber){
  for (var i = 0; i < this.courseList.length; i++){
    if (courseNumber === this.courseList[i].number)
      return this.courseList[i];
  }
  return null;
};

DegreePlan.prototype.addPrerequisite = function(courseNumber, prerequisiteNumber){
  var course = this.findCourse(courseNumber);
  var prerequisite = this.findCourse(prerequisiteNumber);
  if(course.addPrerequisite(prerequisite) === 1)
    return 1;
  return 0;
};

DegreePlan.prototype.toString = function(){
  var courseStrings = this.courseList.reduce(function(acc, course){
    acc += course.toString();
    return acc;
  }, "");
  return "Degree Plan Name: " + this.name + "\n" + courseStrings;
};

module.exports = DegreePlan;
