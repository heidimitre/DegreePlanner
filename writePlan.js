var fs = require('fs');

var writePlan = function(courseList){
  fs.writeFile('degree_plan.txt', courseList, function(err){
    if(err){
      return console.log(err);
    }

    console.log("File saved as degree_plan.txt");
  });
}

module.exports = writePlan;
