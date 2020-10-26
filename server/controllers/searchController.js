const symptomToDisease = (req, res) => {
  console.log("lol");
};

const diseaseToSpecialization = (req, res) => {
  console.log("lol");
};

const findDoctor = (req, res) => {
  symptomToDisease(req, res);

  diseaseToSpecialization(req, res);

  console.log(res.locals.user);
  res.send(res.locals.user);
};

module.exports = { findDoctor };
