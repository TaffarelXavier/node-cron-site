var cron = require("node-cron");
const axios = require("axios");

cron.schedule("30 * * * * *", () => {
  axios
    .get("https://stilotechstore.com.br")
    .then((response) => {
      console.log("Response", response.status);
      console.log("Response", response.statusText);
    })
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
});
