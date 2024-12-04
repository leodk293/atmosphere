"use strict";
exports.__esModule = true;
exports.db = void 0;
var dotenv_1 = require("dotenv");
var libsql_1 = require("drizzle-orm/libsql");
dotenv_1.config({ path: '.env.local' });
exports.db = libsql_1.drizzle({ connection: {
        url: process.env.TURSO_CONNECTION_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    } });
