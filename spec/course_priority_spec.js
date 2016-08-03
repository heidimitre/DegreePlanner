var DegreePlan = require('../degreePlan');

describe('findHighestPriority', function(){
  it('finds max depth of all courses still needing to be completed.', function(){

    var plan = new DegreePlan('Computer Science');

    plan.addCourse('485', 'x', 3);
    plan.addCourse('355', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('105', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('400', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);

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

    expect(plan.findHighestPriority()).toBe(3);

  });
});

describe('findNextClass', function(){
  it('finds next class to be completed.', function(){

    var plan = new DegreePlan('Computer Science');

    plan.addCourse('485', 'x', 3);
    plan.addCourse('355', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('105', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('400', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);

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

    expect(plan.findNextClass().number).toBe("205");

  });
});

describe('addCourseToSemester', function(){
  it('adds a course to the current semester.', function(){

    var plan = new DegreePlan('Computer Science');

    plan.addCourse('485', 'x', 3);
    plan.addCourse('355', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('105', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('400', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);

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

    plan.addCourseToSemester(plan.findNextClass());
    plan.addCourseToSemester(plan.findNextClass());
    plan.addCourseToSemester(plan.findNextClass());
    plan.addCourseToSemester(plan.findNextClass());
    console.log(this.semesterContainer);


    expect(plan.getCurrentSemester().length).toBe(4);

  });
});
