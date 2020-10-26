const fs = require("fs");

const symptomToDisease = (req, res) => {
  fs.readFile("../public/data/symptoms.json", (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
    return student;
  });
};

const diseaseToSpecialization = (req, res) => {
  console.log("lol");
};

const findDoctor = (req, res) => {
  const diseases = symptomToDisease(req, res);

  diseaseToSpecialization(req, res);

  console.log(res.locals.user);
  res.send(res.locals.user);
};

module.exports = { findDoctor };
