"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const database_1 = require("./config/database");
async function connectToDatabase() {
    return (0, database_1.connectToDatabase)();
}
