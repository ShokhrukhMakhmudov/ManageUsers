// import express from "express";
// import * as admin from "firebase-admin";
// import { initializeApp } from "firebase-admin/app";
// import credentials from "./key.json" assert { type: "json" };

const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const serviceAccount = require("./key.json");
const dotenv = require("dotenv");

dotenv.config();
// const admin = initializeApp();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-c6ebe.firebaseio.com", // Замените на URL вашей базы данных Firebase
});

const auth = admin.auth();

const users = {};

const app = express();
app.use(cors());

app.get("/users", async (req, res) => {
  // Use auth to list users

  try {
    auth
      .listUsers(1000)
      .then(function (listUsersResult) {
        console.log(listUsersResult);
        res.json(listUsersResult);
      })
      .catch(function (error) {
        console.log("Error listing users:", error);
      });
  } catch (e) {
    return res.sendStatus(401);
  }
});
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log("server is running");
});
