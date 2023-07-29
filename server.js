const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv");
// const mysql2 = require("mysql2");
dotenv.config({ path: "config.env" });



//route
const mountRoutes = require("./routes");

//error class that i made in utils to handle operational error

const ApiError = require("./utils/apiError");
//GLobal error handling middleware for express
const globalError = require("./middlewares/errorMiddleware");

//express app
const app = express();
//enable other domains access your application
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

//middlewares
//pasring the comming data to json
app.use(express.json());
//serve static files inside 'uploads'
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(process.env.NODE_ENV);
}

// Mount Routes
mountRoutes(app);

//if there is a problem with routes
// catch the wrong routes that i never Mount
app.all("*", (req, res, next) => {
  //create error and send it to error handling middleware
  next(new ApiError(`Cant Find This Route ${req.originalUrl}`, 400));
});

app.use(globalError);


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
// Handle unhandled rejections outside of Express
// Events => list => callback(err)
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down.....");
    process.exit(1);
  });
});
