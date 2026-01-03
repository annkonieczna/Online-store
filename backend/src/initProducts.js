import db from "./db.js";
 export default async function initProducts() {
  const res = await fetch(
    "https://fakestoreapiserver.reactbd.org/api/products"
  );
  const data = await res.json();

  data.data.forEach((p) => {
    db.run(
      `INSERT OR IGNORE INTO Products
            (id,title,description,price,category,image,stock,rating)
            VALUES (?,?,?,?,?,?,?,?)`,
      [
        p._id,
        p.title,
        p.description,
        p.price,
        p.category,
        p.image,
        p.stock,
        p.rating,
      ]
    );
  });
  console.log("Haha hihi");
}

