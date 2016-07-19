var DegreePlan = function(name){
  this.name = name;
  this.courseList = [];
};

//Checks if course is already in array
//Returns 1 if course is in array, 0 if not
DegreePlan.prototype.checkCourse = function(course){
  for (var i = 0; i < this.courseList.length; i++){
    if (course.number === this.courseList[i].number)
      return 1;
  }
  return 0;
};

//Checks if course is already in the array
//Returns 1 if added to courseList, 0 if already in array
DegreePlan.prototype.addCourse = function(addCourse){
  if(this.checkCourse(addCourse) === 0){
    this.courseList.push(addCourse);
    return 1;
  }
  return 0;
};

//Checks if course is in the array
//Returns 1 if removed, 0 if not removed
DegreePlan.prototype.removeCourse = function(removeCourse){
  if(this.checkCourse(removeCourse) === 1){
        for (var i = 0; i < this.courseList.length; i++){
          if (removeCourse.number === this.courseList[i].number)
            this.courseList.splice(i,1);
            return 1;
        }
  }
  return 0;
};
module.exports = DegreePlan;
