const fs = require("fs");
const Doctor = require("../models/doctor");

const symptomToDisease = (req, res) => {
  return new Promise((resolve, reject) => {
    const { symptoms } = req.body;

    fs.readFile(process.env.DISEASE_FILE, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let diseases_list = JSON.parse(data);
        let diseases = [];

        symptoms.forEach(
          (symptom) => (diseases = diseases.concat(diseases_list[symptom]))
        );
        resolve(diseases);
      }
    });
  });
};

const diseaseToSpecialization = (req, res, diseases) => {
  return new Promise((resolve, reject) => {
    fs.readFile(process.env.SPECIAL_FILE, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let specializations_list = JSON.parse(data);
        let specializations = {};
        let mostCommon = {
          common1: [0, undefined],
          common2: [0, undefined],
          common3: [0, undefined],
        };

        diseases.forEach((disease) => {
          let specs = specializations_list[disease];

          specs.forEach((spec) => {
            if (specializations[spec]) {
              specializations[spec] += 1;
              let num = specializations[spec];

              if (mostCommon.common1[0] < num) {
                mostCommon.common1 = [num, spec];
              } else if (mostCommon.common2[0] < num) {
                mostCommon.common2 = [num, spec];
              } else if (mostCommon.common3[0] < num) {
                mostCommon.common3 = [num, spec];
              }
            } else {
              specializations[spec] = 1;

              if (mostCommon.common1[0] < 1) {
                mostCommon.common1 = [1, spec];
              } else if (mostCommon.common2[0] < 1) {
                mostCommon.common2 = [1, spec];
              } else if (mostCommon.common3[0] < 1) {
                mostCommon.common3 = [1, spec];
              }
            }
          });
        });

        resolve([
          mostCommon.common1[1],
          mostCommon.common2[1],
          mostCommon.common3[1],
        ]);
      }
    });
  });
};

const findDoctor = async (req, res) => {
  const diseases = await symptomToDisease(req, res);

  const specializations = await diseaseToSpecialization(req, res, diseases);

  // diseaseToSpecialization(req, res);

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
