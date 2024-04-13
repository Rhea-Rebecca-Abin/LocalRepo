const express = require("express");
const mysql = require("mysql");
//create connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rhea123",
  database: "trial",
});
//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql connected");
});

const app = express();

//Insert data

app.get("/adduser1", (req, res) => {
  let post = { User_ID: "11", Name: "christopher Columbus", Age: "45" };
  let sql = "INSERT INTO user SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("user 11 added");
  });
});

//Create database

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created");
  });
});

//Select  data from user table

app.get("/getuserdata", (req, res) => {
  let sql = "SELECT * FROM user";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Data from user table fetched successfully");
  });
});

//Select single post
app.get("/getuser/:User_ID", (req, res) => {
  let sql = `SELECT * FROM user WHERE User_ID= ${req.params.User_ID}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Single Data from user table fetched successfully");
  });
});

app.get("/updateuser/:User_ID", (req, res) => {
  let newname = "Hercules";
  let sql = `UPDATE user SET Name = '${newname}' WHERE User_ID= ${req.params.User_ID}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Updated");
  });
});

//Delete post
app.get("/deleteuser/:User_ID", (req, res) => {
  //let newname = "Hercules";
  let sql = `DELETE FROM user WHERE User_ID= ${req.params.User_ID}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("DELETED!!!!!!!!!!!!!!");
  });
});

app.listen("3000", () => {
  console.log("Server running on port 3000");
});
