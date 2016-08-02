var DegreePlan = require('../degreePlan');

describe("DegreePlan", function(){
  it("has a name", function(){
    var plan = new DegreePlan('Computer Science');

    expect(plan.name).toBe('Computer Science');
  });

  it('has an empty course list when created.', function(){
    var plan = new DegreePlan('Computer Science');

    expect(plan.courseList).toEqual([]);
  });
});

describe('requiresPrerequisite', function(){
  it('returns true if it has a prerequisite.', function(){
    var plan = new DegreePlan('Computer Science');
    plan.addCourse('CSE 205', 'OOP', 3);
    plan.addCourse('CSE 110', 'Intro to Java', 3);

    plan.addPrerequisite('CSE 205', 'CSE 110');

    expect(plan.requiresPrerequisites("CSE 205")).toBe(true);
  });
  it('returns false if it does not have a prerequisite.', function(){
    var plan = new DegreePlan('Computer Science');
    plan.addCourse('CSE 205', 'OOP', 3);
    plan.addCourse('CSE 110', 'Intro to Java', 3);

    expect(plan.requiresPrerequisites("CSE 205")).toBe(false);
  });
  it('handles more complicated situations.', function(){
    var plan = new DegreePlan('Computer Science');
    plan.addCourse('CSE 205', 'OOP', 3);
    plan.addCourse('CSE 120', 'Digital', 3);
    plan.addCourse('CSE 110', 'Intro to Java', 3);
    plan.addCourse('CSE 430', 'OS', 3);

    plan.addPrerequisite('CSE 205', 'CSE 120');
    plan.addPrerequisite('CSE 120', 'CSE 110');

    expect(plan.requiresPrerequisites("CSE 205")).toBe(true);
    expect(plan.requiresPrerequisites("CSE 120")).toBe(true);
    expect(plan.requiresPrerequisites("CSE 110")).toBe(false);
    expect(plan.requiresPrerequisites("CSE 430")).toBe(false);
  });
});

describe('countPrerequsiteChain', function(){
  it('returns zero if no prerequisites found.', function(){
    var plan = new DegreePlan('Computer Science');
    plan.addCourse('CSE 205', 'OOP', 3);

    expect(plan.countPrerequisiteChain("CSE 205")).toBe(0);
  });
  it('returns 1 if only one prerequisite required.', function(){
    var plan = new DegreePlan('Computer Science');
    plan.addCourse('CSE 205', 'OOP', 3);
    plan.addCourse('CSE 110', 'Intro to Java', 3);

    plan.addPrerequisite('CSE 205', 'CSE 110');

    expect(plan.countPrerequisiteChain("CSE 205")).toBe(1);
  });
});
