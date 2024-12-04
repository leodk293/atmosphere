"use strict";
exports.__esModule = true;
exports.usersTable = void 0;
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.usersTable = sqlite_core_1.sqliteTable('users', {
    id: sqlite_core_1.integer('id').primaryKey(),
    name: sqlite_core_1.text('name').notNull(),
    email: sqlite_core_1.text('email').unique().notNull()
});
