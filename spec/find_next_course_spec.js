var DegreePlan = require('../degreePlan');

describe('isNotTaken', function(){
  it('returns true if the course is not complete or in progress.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse("205", "x", 3);

    expect(plan.isNotTaken("205")).toBe(true);
  });
  it('returns false if the course is complete.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse("205", "x", 3);

    var course = plan.findCourse("205");
    course.isComplete = true;
    expect(plan.isNotTaken("205")).toBe(false);
  });
  it('returns false if the course is in progress.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse("205", "x", 3);

    var course = plan.findCourse("205");
    course.inProgress = true;
    expect(plan.isNotTaken("205")).toBe(false);
  });
});

describe('prerequsitesCompleted', function(){
  it('returns false if all prerequisites are not completed.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse("205", "x", 3);
    plan.addCourse("110", "x", 3);
    plan.addCourse("120", "x", 3);

    plan.addPrerequisite("205", "110");
    plan.addPrerequisite("205", "120");

    expect(plan.prerequsitesCompleted("205")).toBe(false);
  });
  it('returns true if all prerequisites are completed.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse("205", "x", 3);
    plan.addCourse("110", "x", 3);
    plan.addCourse("120", "x", 3);

    plan.addPrerequisite("205", "110");
    plan.addPrerequisite("205", "120");

    plan.findCourse("110").isComplete = true;
    plan.findCourse("120").isComplete = true;

    expect(plan.prerequsitesCompleted("205")).toBe(true);
  });
  it('returns true if there are no prerequisites.', function(){
    var plan = new DegreePlan("CS");

    plan.addCourse("205", "x", 3);

    expect(plan.prerequsitesCompleted("205")).toBe(true);
  });
});
