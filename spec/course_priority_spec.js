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
    nextCourse.inProgress = true;

    var otherCourse = plan.findNextCourse();
    expect(otherCourse.number).toBe("400");

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
    nextCourse.inProgress = false;
    nextCourse.isComplete = true;

    var otherCourse = plan.findNextCourse();
    expect(otherCourse.number).toBe("240");

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
    plan.findNextCourse().inProgress = true;
    expect(plan.findNextCourse().number).toBe("301");
  });
});
