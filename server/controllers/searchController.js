const Doctor = require("../models/doctor");

const symptomToDisease = (req, res) => {
  console.log("lol");
};

const diseaseToSpecialization = (req, res) => {
  console.log("lol");
};

const findDoctor = (req, res) => {
  symptomToDisease(req, res);

  diseaseToSpecialization(req, res);

  const spec = ["spec1", "spec2", "spec3"];

  const sortedDocs = [];

  for (var j = 0; j < 3; j++) {
    Doctor.find({ specialization: spec[i] })
      .lean()
      .then((result) => {
        for (var i = 0; i < result.length - 1; i++) {
          var minInd = i;
          for (var k = i + 1; k < result.length; k++) {
            if (
              result[k].get("years_of_experience") >
              result[minInd].get("years_of_experience")
            )
              minInd = k;

            var tmp = result[k];
            result[k] = result[i];
            result[i] = tmp;
          }
        }

        for (var i = 0; i < result.length; i++) sortedDocs.push(result[i]);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  res.send(sortedDocs);

  console.log(res.locals.user);
  res.send(res.locals.user);
};

module.exports = { findDoctor };
