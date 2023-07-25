// const http = require("http"); in express, there is shortcut
const express= require('express');
const path = require("path");
const bodyParser = require('body-parser');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})

app.listen(3000); //Express shortcut to create server and listen


// using express shortcut to create servara and listen
// const server = http.createServer(app);

// server.listen(5000)