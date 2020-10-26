const axios = require("axios");

// axios
//   .get("http://54.183.200.234:5000/")
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

axios
  .post("http://54.183.200.234:5000/patient/signup", {
    password: "savepeach",
  })
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
