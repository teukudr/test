const express = require("express");
const handler = require("./handler");
const middleware = require("./middleware");
const path = require("path");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const uploadOnMemory = require("./uploadOnMemory");


const port = process.env.PORT || 8000;
const app = express();

// Pasang JSON Parser middleware
app.use(express.json());
app.set("view engine", "ejs");
const PUBLIC_DIRECTORY = path.join(__dirname, "public");

// Set format request
app.use(express.urlencoded({ extended: true }));

// Set PUBLIC_DIRECTORY sebagai
// static files di express
app.use(express.static(PUBLIC_DIRECTORY));
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// Router
app.get("/", (req, res) => {
    res.render("index", {
      name: req.query.name || "Guest",
    });
  });

app.get("/books/create", handler.handleCreateBookForm);
app.post("/books", uploadOnMemory.single("image"), handler.handleCreateBook);
app.get("/books", handler.handleListBooks);

app.get("/books/:id/update", middleware.setBook, handler.handleUpdateBookForm);
app.post("/books/:id/update", uploadOnMemory.single("image"), handler.handleUpdateBook);

app.get("/books/:id/delete",middleware.setBook, handler.handleDeleteBook);

app.get("/books/:id", middleware.setBook, handler.handleGetBook);
app.put("/books/:id", middleware.setBook, handler.handleUpdateBook);
app.delete("/books/:id", middleware.setBook, handler.handleDeleteBook);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
