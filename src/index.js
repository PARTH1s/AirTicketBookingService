const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const ApiRoutes = require("./routes/index");

const { PORT } = require('./config/server-config');

const setupAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", ApiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at port : ${PORT}`);
    });
}

setupAndStartServer();