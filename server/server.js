const connectDatabase = require("./DB/Database");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server for handling uncaught exeption");
});
//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

//db connection
connectDatabase();

//create server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is on http://localhost: ${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`shutting down server for : ${err.message}`);
});
