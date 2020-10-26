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
  .get("http://localhost:5000/patient/5f9643819600abac6394bc8b")
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
