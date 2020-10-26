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

        symptoms.forEach((symptom) => {
          if (diseases_list[symptom])
            diseases = diseases.concat(diseases_list[symptom]);
        });

        resolve(diseases);
      }
    });
  });
};

const diseaseToSpecialization = (diseases) => {
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

          if (specs) {
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
          }
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

  const specializations = await diseaseToSpecialization(diseases);

  const sortedDocs = [];

  await Promise.all(
    specializations.map(async (specialization) => {
      const doctors = await Doctor.find({
        specialization: specialization,
      }).sort({
        rating: -1,
      });

      doctors.forEach((doctor) => sortedDocs.push(doctor));
    })
  );

  res.send(sortedDocs);
};

module.exports = { findDoctor };
