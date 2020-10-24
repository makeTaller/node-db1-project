const express = require("express");
const account = require("../accounts")

const db = require("../data/dbConfig");

const server = express();

server.use(express.json());
server.use("/accounts", account)

module.exports = server;
