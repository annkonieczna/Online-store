import { pool } from "../config/db.js";

export default async function initProducts() {
  const res = await fetch(
    "https://fakestoreapiserver.reactbd.org/api/products"
  );
  const data = await res.json();

  data.data.forEach((p) => {
    const query = `INSERT IGNORE INTO products
            (id,title,description,price,category,image,stock,rating)
            VALUES (?,?,?,?,?,?,?,?)`;
    const values = [
      p._id,
      p.title,
      p.description,
      p.price,
      p.category,
      p.image,
      p.stock,
      p.rating,
    ];

    pool.query(query, values);
  });
  console.log("Haha hihi");
}
