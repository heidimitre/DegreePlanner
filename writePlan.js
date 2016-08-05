var fs = require('fs');

var writePlan = function(degreePlan){
  fs.writeFile('degree_plan.txt', degreePlan.printPlan(), function(err){
    if(err){
      return console.log(err);
    }

    console.log("File saved as degree_plan.txt");
  });
}

module.exports = writePlan;
