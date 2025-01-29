const express = require("express");
const app = express();
const PORT = 8080;
const { sequelize } = require("./models");
const serverPrefix = "/api-server";
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// /api-server
const indexRouter = require("./routes");
app.use(serverPrefix, indexRouter);
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("db 연결 오류");
  });
