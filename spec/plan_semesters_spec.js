var DegreePlan = require('../degreePlan');

describe('getSemester', function(){
  xit('returns a list of the correct classes when given a semester.', function(){

    var plan = new DegreePlan('Computer Science');

    plan.addCourse('485', 'x', 3);
    plan.addCourse('355', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('105', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('400', 'x', 3);

    plan.addPrerequisite('485', '355');
    plan.addPrerequisite('485', '360');
    plan.addPrerequisite('420', '301');
    plan.addPrerequisite('420', '400');

    var heads = plan.findHeads();
    for(var i = 0; i < heads.length; i++)
    {
      plan.calculateDepths(heads[i].number);
    }

    expect(containsCourse("360", plan.getSemesterCourses(1))).toEqual(true);
    expect(containsCourse("355", plan.getSemesterCourses(1))).toEqual(true);
    expect(containsCourse("301", plan.getSemesterCourses(1))).toEqual(true);
    expect(containsCourse("400", plan.getSemesterCourses(1))).toEqual(true);
    expect(containsCourse("105", plan.getSemesterCourses(2))).toEqual(true);
    expect(containsCourse("420", plan.getSemesterCourses(2))).toEqual(true);
    expect(containsCourse("485", plan.getSemesterCourses(2))).toEqual(true);
  });
});

function containsCourse(courseNumber, semesterList){
  return semesterList.reduce(function(boolean, course){
    if(course.number === courseNumber)
      return true;
    return boolean;
  }, false);
};
