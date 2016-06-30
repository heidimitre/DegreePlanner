var Course = function(number, title, creditHours){
  this.number = number;
  this.title = title;
  this.creditHours = creditHours;
  this.prerequisiteList = [];
  this.isComplete = False;  //all courses are considered incomplete by default
};

Course.prototype.completeCourse = function(){
  this.isComplete = True;
};

Course.prototype.addPrerequisite = function(addCourse){
  //check if course is already in the array
  //return 1 if added, else return 0
};

Course.prototype.removePrerequisite = function(removeCourse){
  //check if course is in the array
  //return 1 if removed, else return 0
};

module.exports = Course;
