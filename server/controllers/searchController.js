const fs = require("fs").promises;
const Doctor = require("../models/doctor");

// map provided symptoms to related diseases
const symptomToDisease = async (req, res) => {
  const { symptoms } = req.query;

  // reading temporary JSON file containing mappings of symptoms to diseases
  const data = await fs.readFile(process.env.DISEASE_FILE);
  const diseases_list = JSON.parse(data);
  let diseases = [];

  // for each given symptom, get the corresponding disease
  symptoms.forEach((symptom) => {
    if (diseases_list[symptom])
      diseases = diseases.concat(diseases_list[symptom]);
  });

  return diseases;
};

// map diseases to specializations
const diseaseToSpecialization = async (diseases) => {
  // read temporary JSON file containing mappings of disease to specializations
  const data = await fs.readFile(process.env.SPECIAL_FILE);
  const specializations_list = JSON.parse(data);
  let specializations = {};
  let mostCommon = {
    common1: [0, undefined],
    common2: [0, undefined],
    common3: [0, undefined],
  };

  // for each possible disease, return the 3 most common specializations
  diseases.forEach((disease) => {
    let specs = specializations_list[disease];
    // disease has no specialization match, continue to next disease
    if (!specs) return;

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

  return [mostCommon.common1[1], mostCommon.common2[1], mostCommon.common3[1]];
};

// find a list of doctors suitable for a patient given a patient's symptoms
const findDoctor = async (req, res) => {
  try {
    const diseases = await symptomToDisease(req, res);

    const specializations = await diseaseToSpecialization(diseases);

    const verifiedDoc = [];
    const unverifiedDoc = [];

    // for each of the most suitable specializations, append doctors in order
    // of decreasing ratings
    await Promise.all(
      specializations.map(async (specialization) => {
        const doctors = await Doctor.find({
          specialization: specialization,
        }).sort({
          rating: -1,
        });

        doctors.forEach((doctor) => {
          if (doctor.verified) {
            verifiedDoc.push(doctor);
          } else {
            unverifiedDoc.push(doctor);
          }
        });
      })
    );

    const sortedDocs = verifiedDoc.concat(unverifiedDoc);

    res.json(sortedDocs);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = { findDoctor, symptomToDisease, diseaseToSpecialization };
