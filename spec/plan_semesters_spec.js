var DegreePlan = require('../degreePlan');
/*
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

    expect(containsCourse("360", plan.getSemester(1))).toEqual(true);
    expect(containsCourse("355", plan.getSemester(1))).toEqual(true);
    expect(containsCourse("301", plan.getSemester(1))).toEqual(true);
    expect(containsCourse("400", plan.getSemester(1))).toEqual(true);
    expect(containsCourse("105", plan.getSemester(2))).toEqual(true);
    expect(containsCourse("420", plan.getSemester(2))).toEqual(true);
    expect(containsCourse("485", plan.getSemester(2))).toEqual(true);
  });
});
*/

function containsCourse(courseNumber, semesterList){
  return semesterList.reduce(function(boolean, course){
    if(course.number === courseNumber)
      return true;
    return boolean;
  }, false);
};

describe('createSemester', function(){
  it('returns an array with the courses for the first semester.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse('485', 'x', 3);
    plan.addCourse('355', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);
    plan.addCourse('105', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('400', 'x', 3);

    plan.addPrerequisite('485', '355');
    plan.addPrerequisite('485', '360');
    plan.addPrerequisite('420', '301');
    plan.addPrerequisite('420', '400');
    plan.addPrerequisite('360', '240');
    plan.addPrerequisite('240', '205');

    var heads = plan.findHeads();
    for(var i = 0; i < heads.length; i++)
    {
      plan.calculateDepths(heads[i].number);
    }

    var semester = plan.createSemester();

    expect(containsCourse("205", semester)).toEqual(true);
    expect(containsCourse("301", semester)).toEqual(true);
    expect(containsCourse("400", semester)).toEqual(true);
    expect(containsCourse("355", semester)).toEqual(true);
  });

  it('returns an array with the courses for the second semester.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse('485', 'x', 3);
    plan.addCourse('355', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);
    plan.addCourse('105', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('400', 'x', 3);

    plan.addPrerequisite('485', '355');
    plan.addPrerequisite('485', '360');
    plan.addPrerequisite('420', '301');
    plan.addPrerequisite('420', '400');
    plan.addPrerequisite('360', '240');
    plan.addPrerequisite('240', '205');

    var heads = plan.findHeads();
    for(var i = 0; i < heads.length; i++)
    {
      plan.calculateDepths(heads[i].number);
    }


    var firstSemester = plan.createSemester();

    for(var i = 0; i < firstSemester.length; i++)
    {
      firstSemester[i].isComplete = true;
      firstSemester[i].inProgress = false;
    }

    var secondSemester = plan.createSemester();

    expect(containsCourse("240", secondSemester)).toEqual(true);
    expect(containsCourse("420", secondSemester)).toEqual(true);
    expect(containsCourse("105", secondSemester)).toEqual(true);


  });
});

describe('semesterComplete', function(){
  it('marks courses as complete after adding them to the semester.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse('485', 'x', 3);
    plan.addCourse('355', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);
    plan.addCourse('105', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('400', 'x', 3);

    plan.addPrerequisite('485', '355');
    plan.addPrerequisite('485', '360');
    plan.addPrerequisite('420', '301');
    plan.addPrerequisite('420', '400');
    plan.addPrerequisite('360', '240');
    plan.addPrerequisite('240', '205');

    var heads = plan.findHeads();
    for(var i = 0; i < heads.length; i++)
    {
      plan.calculateDepths(heads[i].number);
    }

    var semester = plan.createSemester();
    plan.semesterComplete(semester);

    expect(plan.findCourse("205").isComplete).toEqual(true);
    expect(plan.findCourse("205").inProgress).toEqual(false);
    expect(plan.findCourse("301").isComplete).toEqual(true);
    expect(plan.findCourse("301").inProgress).toEqual(false);
    expect(plan.findCourse("400").isComplete).toEqual(true);
    expect(plan.findCourse("400").inProgress).toEqual(false);
    expect(plan.findCourse("355").isComplete).toEqual(true);
    expect(plan.findCourse("355").inProgress).toEqual(false);

    var secondSemester = plan.createSemester();
    plan.semesterComplete(secondSemester);

    expect(plan.findCourse("420").isComplete).toEqual(true);
    expect(plan.findCourse("420").inProgress).toEqual(false);
    expect(plan.findCourse("240").isComplete).toEqual(true);
    expect(plan.findCourse("240").inProgress).toEqual(false);
    expect(plan.findCourse("105").isComplete).toEqual(true);
    expect(plan.findCourse("105").inProgress).toEqual(false);

  });
});
