import sqlite3 from "sqlite3";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { fileURLToPath } from "url";

//making the connection with a database
const db = new sqlite3.Database(
  join(__dirname, "../database/database.sqlite"),
  (err) => {
    if (err) {
      console.error("Database connection error:", err);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);
//Everything inside will be executed in order
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY,
        title TEXT, 
        description TEXT,
        price REAL,
        category TEXT,
        image TEXT,
        stock INTEGER,
        rating REAL
        )`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
        )`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS Opinions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    userId INTEGER,
    rating INTEGER,
    description TEXT,
    createdAt TEXT)`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    total REAL,
    createdAt TEXT)`
  );
});

export default db;
