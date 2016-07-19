var Course = function(number, title, creditHours){
  this.number = number;
  this.title = title;
  this.creditHours = creditHours;
  this.prerequisiteList = [];
  this.isComplete = false;  //all courses are considered incomplete by default
};

Course.prototype.completeCourse = function(){
  this.isComplete = true;
};

//Checks if prerequisite course is already in array
//Returns 1 if course is in array, 0 if not
Course.prototype.checkPrerequisite = function(course){
    for (var i = 0; i < this.prerequisiteList.length; i++){
      if (course.number === this.prerequisiteList[i].number)
        return 1;
    }
    return 0;
};

//Checks if course is already in the array
//Returns 1 if added to prerequisiteList, 0 if already in array
Course.prototype.addPrerequisite = function(addCourse){
  if(this.checkPrerequisite(addCourse) === 0){
    this.prerequisiteList.push(addCourse);
    return 1;
  }
  return 0;
};

//Checks if course is in the array
//Returns 1 if removed, 0 if not removed
Course.prototype.removePrerequisite = function(removeCourse){
  if(this.checkPrerequisite(removeCourse) === 1){
        for (var i = 0; i < this.prerequisiteList.length; i++){
          if (removeCourse.number === this.prerequisiteList[i].number)
            this.prerequisiteList.splice(i,1);
            return 1;
        }
  }
  return 0;
};

 Course.prototype.toString = function(){
  return this.number + ", " + this.title + ", Credit Hours: " + this.creditHours + ", Complete: " + this.isComplete + "\n";
 };

Course.prototype.displayPrerequisites = function(){
  var prerequisiteString = "";
  for (var i = 0; i < this.prerequisiteList.length; i++){
    prerequisiteString = prerequisiteString + "" + this.prerequisiteList[i].number;
  }
  return prerequisiteString;
};

module.exports = Course;
