var Course = require('./course');

var DegreePlan = function(name){
  this.name = name;
  this.courseList = [];
  this.semesterContainer = [];
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

DegreePlan.prototype.requiresPrerequisites = function(courseNumber){
  if(this.findCourse(courseNumber).hasPrerequisites() === true)
    return true;
  return false;
};

DegreePlan.prototype.getSemester = function(semesterNumber){

};

DegreePlan.prototype.manageSemesters = function(){
  //calls addSemesterToContainer until all classes have been added
};

DegreePlan.prototype.addSemesterToContainer = function(){
  var semester = this.createSemester();
  if(semester.length > 0){
    this.semesterComplete(semester);
    this.semesterContainer.push(semester);
    return true;
  }
  return false;
};

DegreePlan.prototype.createSemester = function(){
  var semesterArray = [];
  var course = this.findNextCourse();
  while(course != null && semesterArray.length < 4)
  {
    course.inProgress = true;
    semesterArray.push(course);
    course = this.findNextCourse();
  }
  return semesterArray;
};

DegreePlan.prototype.semesterComplete = function(semesterArray){
  for(var i = 0; i < semesterArray.length; i++)
  {
    semesterArray[i].isComplete = true;
    semesterArray[i].inProgress = false;
  }
};


//find max in depthArray
DegreePlan.prototype.getMaxDepth = function(courseNumber){
  var depthArray = this.findCourse(courseNumber).depthArray;
  var max = 0;
  for(var i = 0; i < depthArray.length; i++)
  {
    if(depthArray[i] > max)
      max = depthArray[i];
  }
  return max;
};

//creates arrays for each level
//adds depth of course to its depthArray
DegreePlan.prototype.calculateDepths = function(head){
  var temp = [];
  var horizon = []; //contains all courses at a particular level
  var depth = 0;

  horizon.push(this.findCourse(head));

  while(horizon.length > 0)
  {
    for(var j = 0; j < horizon.length; j++)
    {
      horizon[j].depthArray.push(depth);
      for(var k = 0; k < horizon[j].prerequisiteList.length; k++)
      {
        temp.push(horizon[j].prerequisiteList[k]);
      }
    }
    depth++;
    horizon = temp;
    temp = [];
  }
};

//finds head of each tree and returns array of all courses not prerequisite for another course
DegreePlan.prototype.findHeads = function(){
  var heads = [];
  var isHead = true;
  this.courseList.forEach(function(course){
    for(var i = 0; i < this.courseList.length; i++)
    {
      for(var j = 0; j < this.courseList[i].prerequisiteList.length; j++)
      {
        if(course === this.courseList[i].prerequisiteList[j])
          isHead = false;
      }
    }
    if((isHead === true) && (heads.indexOf(course) === -1))
      heads.push(course);
    isHead = true;
  }.bind(this));
  return heads;
};

DegreePlan.prototype.findNextCourse = function(){
  var highestDepth = 0;
  var nextCourse = null;
  var courseList = this.courseList;

  for(var i = 0; i < courseList.length; i++)
  {
    if(this.isNotTaken(courseList[i].number) && (this.prerequsitesCompleted(courseList[i].number)))
    {
      if(this.getMaxDepth(courseList[i].number) >= highestDepth)
      {
        highestDepth = this.getMaxDepth(courseList[i].number);
        nextCourse = this.courseList[i];
      }
    }
  }
  return nextCourse;
};

DegreePlan.prototype.isNotTaken = function(courseNumber){
  var course = this.findCourse(courseNumber);
  if(course.isComplete === false && course.inProgress === false)
    return true;
  return false;
};

DegreePlan.prototype.prerequsitesCompleted = function(courseNumber){
  var course = this.findCourse(courseNumber);
  for(var i = 0; i < course.prerequisiteList.length; i++)
  {
    if(course.prerequisiteList[i].isComplete === false)
      return false;
  }
  return true;
};

DegreePlan.prototype.toString = function(){
  var courseStrings = this.courseList.reduce(function(acc, course){
    acc += course.toString();
    return acc;
  }, "");
  return "Degree Plan Name: " + this.name + "\n" + courseStrings;
};

module.exports = DegreePlan;
