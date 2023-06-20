const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const router = require("./routes/routes");
const port = process.env.PORT || 5000;
dotenv.config();

// DEFINE ENVIRONMENT
let URI = process.env.MONGO_URI_DEV;
if (process.env.ENVIRONMENT == "prod") URI = process.env.MONGO_URI;

// DATABASE CONNECTION
mongoose
	.connect(URI, {
		useNewUrlParser: true,
	})
	.then(() => console.log("Connected to database"))
	.catch((err) => console.log(err));

app.use(
	cors({
		origin: "*",
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use("/uploads", express.static("./uploads"));

app.use("/api", router);

app.listen(port, function () {
	console.log(`Server Started: http://localhost:${port}/api/`);
});
