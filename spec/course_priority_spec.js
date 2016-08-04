
var DegreePlan = require('../degreePlan');

describe('findNextCourse', function(){
  it('finds the next course to be completed.', function(){

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

    var nextCourse = plan.findNextCourse();
    expect(nextCourse.number).toBe("205");
    expect(nextCourse.inProgress).toBe(true);

    var otherCourse = plan.findNextCourse();
    expect(otherCourse.number).toBe("355");
    expect(otherCourse.inProgress).toBe(true);

  });
  it('finds the next course to be completed if its prerequisite is completed.', function(){

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

    var nextCourse = plan.findNextCourse();
    expect(nextCourse.number).toBe("205");
    expect(nextCourse.inProgress).toBe(true);
    nextCourse.inProgress = false;
    nextCourse.isComplete = true;

    var otherCourse = plan.findNextCourse();
    expect(otherCourse.number).toBe("240");
    expect(otherCourse.inProgress).toBe(true);

  });

  it('finds the next course to be completed when there are no other courses that can be taken.', function(){

    var plan = new DegreePlan('Computer Science');

    plan.addCourse('485', 'x', 3);
    plan.addCourse('360', 'x', 3);
    plan.addCourse('420', 'x', 3);
    plan.addCourse('301', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);

    plan.addPrerequisite('485', '360');
    plan.addPrerequisite('420', '301');
    plan.addPrerequisite('360', '240');
    plan.addPrerequisite('240', '205');

    var heads = plan.findHeads();
    for(var i = 0; i < heads.length; i++)
    {
      plan.calculateDepths(heads[i].number);
    }

    expect(plan.findNextCourse().number).toBe("205");
    expect(plan.findNextCourse().number).toBe("301");
/*
    plan.findCourse("205").inProgress = false;
    plan.findCourse("205").isComplete = true;
    plan.findCourse("301").inProgress = false;
    plan.findCourse("301").isComplete = true;

    expect(plan.findNextCourse().number).toBe("240");
    expect(plan.findNextCourse().number).toBe("420");
    plan.findCourse("240").inProgress = false;
    plan.findCourse("240").isComplete = true;
    plan.findCourse("420").inProgress = false;
    plan.findCourse("420").isComplete = true;

    expect(plan.findNextCourse().number).toBe("360");
    plan.findCourse("360").inProgress = false;
    plan.findCourse("360").isComplete = true;

    expect(plan.findNextCourse().number).toBe("485");
*/
  });
});

/*

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


    expect(plan.getCurrentSemester().length).toBe(4);

  });
});
*/
