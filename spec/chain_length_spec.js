var DegreePlan = require('../degreePlan');

describe('hasDepth', function(){
  it('has the correct depth after the counting method is run.', function(){
    var plan = new DegreePlan('Computer Science');
    plan.addCourse('310', 'x', 3);
    plan.addCourse('243', 'x', 3);
    plan.addCourse('266', 'x', 3);
    plan.addCourse('204', 'x', 3);
    plan.addCourse('240', 'x', 3);
    plan.addCourse('205', 'x', 3);
    plan.addCourse('110', 'x', 3);

    plan.addPrerequisite('310', '243');
    plan.addPrerequisite('310', '240');
    plan.addPrerequisite('243', '266');
    plan.addPrerequisite('240', '266');
    plan.addPrerequisite('240', '205');
    plan.addPrerequisite('266', '204');
    plan.addPrerequisite('266', '110');
    plan.addPrerequisite('205', '110');

    plan.calculateDepths("310");

    expect(plan.getMaxDepth("310")).toBe(0);
    expect(plan.getMaxDepth("243")).toBe(1);
    expect(plan.getMaxDepth("266")).toBe(2);
    expect(plan.getMaxDepth("110")).toBe(3);
  });
});
