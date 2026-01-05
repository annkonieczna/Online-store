import { pool } from "../config/db.js";

const opinionsTableQuery = `CREATE TABLE  IF NOT EXISTS opinions (
  id INT AUTO_INCREMENT,
  rating INT,
  title VARCHAR(255),
  context TEXT,
  user_id INT,
  product_id INT,
  PRIMARY KEY (id)
);`;
const usersTableQuery = `CREATE TABLE  IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
email VARCHAR(100)  UNIQUE,
  password VARCHAR(100),
 admin TINYINT(1) NOT NULL DEFAULT 0,
   PRIMARY KEY (id)
);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} was created`);
  } catch (error) {
    console.log("sth went wrong", error);
  }
};

const createAllTables = async () => {
  try {
    await createTable("users", usersTableQuery);
    await createTable("opinions", opinionsTableQuery);
    console.log("all tables created");
  } catch (error) {
    console.log("error creating tables", error);
    throw error;
  }
};

export default createAllTables;
