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
const cartTableQuery = `CREATE TABLE IF NOT EXISTS carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,

  CONSTRAINT fk_carts_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  UNIQUE KEY uniq_user_cart (user_id)
) ENGINE=InnoDB;
`;
const cartItemsTableQuery = `CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  size VARCHAR(20) NOT NULL,

  CONSTRAINT fk_cart_items_cart
    FOREIGN KEY (cart_id)
    REFERENCES carts(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_cart_items_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE RESTRICT,

  UNIQUE KEY uniq_cart_product_size (cart_id, product_id, size)
) ENGINE=InnoDB;
`;
const usersTableQuery = `CREATE TABLE  IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
email VARCHAR(100)  UNIQUE,
  password VARCHAR(100),
 admin TINYINT(1) NOT NULL DEFAULT 0,
   PRIMARY KEY (id)
);`;
const productsTableQuery = `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        title TEXT, 
        description TEXT,
        price REAL,
        category TEXT,
        image TEXT,
        stock INTEGER,
        rating REAL
        )`;
const ordersTableQuery = `CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',

  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
`;
const orderItemsTableQuery = `CREATE TABLE  IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,

  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id)
    REFERENCES products(id)
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
    await createTable("products", productsTableQuery);
    await createTable("orders", ordersTableQuery);
    await createTable("cart", cartTableQuery);
    await createTable("cartItems", cartItemsTableQuery);
    await createTable("orderItems", orderItemsTableQuery);

    console.log("all tables created");
  } catch (error) {
    console.log("error creating tables", error);
    throw error;
  }
};

export default createAllTables;
