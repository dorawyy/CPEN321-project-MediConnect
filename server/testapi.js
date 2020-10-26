const axios = require("axios");

axios.defaults.withCredentials = true;

// axios
//   .get("http://54.183.200.234:5000/")
//   .then((res) => {
//     console.log(res.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .post("http://54.183.200.234:5000/doctor/signin", {
//     first_name: "Luigi",
//     last_name: "Scared",
//     email: "luigi@gmail.com",
//     password: "cowardly",
//   })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));

// axios
//   .post("http://localhost:5000/doctor/signin", {
//     first_name: "Luigi",
//     last_name: "Scared",
//     email: "luigi@gmail.com",
//     password: "cowarddly",
//   })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err.response.data));

// axios
//   .post("http://54.183.200.234:5000/doctor/signin", {
//     email: "mario@gmail.com",
//     password: "savepeach",
//   })
//   .then((res) => {
//     const cookie = res.headers["set-cookie"];

//     console.log(cookie);

//     axios
//       .get("http://54.183.200.234:5000/doctor/5f9650255618700869494de3", {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           cookie: cookie,
//         },
//       })
//       .then((res) => console.log(res.data))
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));

axios
  .post("http://localhost:5000/patient/search", {
    symptoms: ["Chest pain"],
  })
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
