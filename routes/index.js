const userRoute = require("./userRoute");
const researchRoute = require("./researchRoute");
const issueRoute = require("./issueRoute");

const mountRoutes = (app) => {
  // Mount Routes
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/researches", researchRoute);
  app.use("/api/v1/issues", issueRoute);
};
module.exports = mountRoutes;
