// this file handles sever setup and routes
import { Request, Response } from "express";
import express from "express"; //import express framework
import axios from "axios"; //import axios framework

const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=node.js"
    );
    const books = response.data.items;
    res.render("index", { books });
  } catch (error) {
    console.error("Error fetching book data:", error.message);
    res.status(500).send("Internal Server Error");
  }
});
