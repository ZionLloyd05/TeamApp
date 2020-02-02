const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const expressHbs = require("express-handlebars");
const app = express();

const port = 3000;

// create connection to database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "play"
});

// connect to database
db.connect(err => {
	if (err) {
		throw err;
	}

	console.log("Connected to database");
});

global.db = db;

// configure middleware
app.set("port", process.env.port || port); // set express to use this port

//--body parser
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(express.static(path.join(__dirname, "public"))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// configure view
app.engine(
	".hbs",
	expressHbs({
		defaultLayout: "layout",
		extname: ".hbs"
	})
);
app.set("view engine", ".hbs");

/**
 * Importing controller functions to perform
 * like getting Data from the database and 
 * passing it to the view.
 */
var {
	getHomePage
} = require("./controller/indexController");

var {
	savePlayer,
	getPlayerForEdit,
	deletePlayer
} = require("./controller/playerController");


// Application Routes

// Home page route
app.get("/", getHomePage);

// /edit-player/id route
app.get("/edit-player/:id", getPlayerForEdit);

// /delete-player/id route
app.get("/delete-player/:id", deletePlayer);

app.post("/save-player", savePlayer);
// set the app to listen on the port
app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});