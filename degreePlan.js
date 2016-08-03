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

DegreePlan.prototype.getSemesterCourses = function(semesterNumber){
  return this.semesterContainer[semesterNumber-1];
};

DegreePlan.prototype.createNewSemester = function(){
  var newSemester = [];
  this.semesterContainer.push(newSemester);
};

DegreePlan.prototype.getCurrentSemester = function(){
  if(this.semesterContainer[0] === null)
    this.createNewSemester();
  return this.semesterContainer[this.semesterContainer.length - 1];
};

DegrePlan.prototype.addPriortityCourse = function(){
  var hasRemainingCourses = false;
  for(var i = 0; i < this.courseList.length; i++)
  {
    if(this.courseList[i].isComplete === false && this.courseList[i].inProgress === false)
      hasRemainingCourses = true;
  }
  if(hasRemainingCourses === true)
    this.addCourseToSemester(findNextClass());
};

DegreePlan.prototype.addCourseToSemester = function(course){
  var currentSemester = this.getCurrentSemester();
  if(currentSemester.length >== 4) //should be changed later to vary based on credit hours
  {
      for(var i = 0; i < currentSemester.length; i++)
      {
        currentSemester[i].isComplete = true;
        currentSemester[i].inProgress = false;
      }
      this.createNewSemester();
      currentSemester = this.getCurrentSemester();
  }
  course.inProgress = true;
  currentSemester.push(course);
};

DegreePlan.prototype.findNextClass = function(){
  for(var i = 0; i < this.courseList.length; i++)
  {
    if((this.getMaxDepth(this.courseList[i].number) === highestCoursePriority & this.courseList[i].isComplete === false && this.courseList[i].inProgress === false)
    {
      var prerequisitesInProgress = false;
      for(var j = 0; j < this.courseList[i].prerequisiteList.length; j++)
      {
        if(this.courseList[i].prerequisiteList[j].inProgress === true && this.courseList[i].prerequisiteList[j].isComplete === false)
          prerequisitesInProgress = true;
      }
      if (prerequisitesInProgress === false)
        return this.courseList[i];
    }
  }
};

DegreePlan.protoype.findHighestPriority = function(){
  var highestCoursePriority = 0;
  for(var i = 0; i < this.courseList.length; i++)
  {
    if((this.getMaxDepth(this.courseList[i].number) > highestCoursePriority) && this.courseList[i].isComplete === false && this.courseList[i].inProgress === false)
    {
      var prerequisitesInProgress = false;
      for(var j = 0; j < this.courseList[i].prerequisiteList.length; j++)
      {
        if(this.courseList[i].prerequisiteList[j].inProgress === true && this.courseList[i].prerequisiteList[j].isComplete === false)
          prerequisitesInProgress = true;
      }
      if (prerequisitesInProgress === false)
      highestCoursePriority = this.getMaxDepth(this.courseList[i].number);
    }
  }
  return highestCoursePriority;
};


DegreePlan.prototype.toString = function(){
  var courseStrings = this.courseList.reduce(function(acc, course){
    acc += course.toString();
    return acc;
  }, "");
  return "Degree Plan Name: " + this.name + "\n" + courseStrings;
};

module.exports = DegreePlan;
