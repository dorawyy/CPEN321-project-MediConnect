const axios = require("axios");

axios.defaults.withCredentials = true;

// axios
//   .get("http://54.183.200.234:5000/doctor")
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
//   .post("http://localhost:5000/patient/signup", {
//     first_name: "Falcon",
//     last_name: "Punch",
//     email: "falcon@gmail.com",
//     password: "smashbros",
//     age: 40,
//     specialization: "Neurology",
//     years_of_experience: 20,
//     verified: true,
//   })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err.response.data));

// axios
//   .post("http://localhost:5000/patient/signin", {
//     email: "johnsmith@gmail.com",
//     password: "password",
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
  .get("http://localhost:5000/patient/search", {
    params: {
      symptoms: ["pain chest"],
    },
  })
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));

// axios
//   .put("http://localhost:5000/doctor/5f9a72292614191b8231ce1c", {
//     age: "30",
//   })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));

// axios
//   .get("http://localhost:5000/patient/pay")
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));

// axios
//   .delete("http://localhost:5000/doctor/5f9d10bb7a3444a4ab75eb62")
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));

// axios
//   .get("http://localhost:5000/patient/appointment/5f9d10bc7a3444a4ab75ebb")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// axios
//   .post("http://localhost:5000/patient/appointment", {
//     patientId: "5f9d10bc7a3444a4ab75eb6b",
//     doctorId: "5f9d10bb7a3444a4ab75eb63",
//     start_time: "new date lol",
//     //end_time: "end date lol",
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// axios
//   .delete("http://localhost:5000/patient/appointment/5f9d18b8aec0303aa5f6070d")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// axios
//   .put("http://localhost:5000/patient/appointment/5f9d1d5a1fbc1993c61f8a76", {
//     start_time: new Date(2020, 11, 20, 11, 0),
//     end_time: new Date(2020, 11, 20, 12, 0),
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
