import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Quantity from "../components/quantity";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";

interface Opinion {
  id: number;
  rating: number;
  name: string;
  description: string;
}

interface Product {
  id: number;
  price: number;
  name: string;
  description: string;
  image: string;
  title: string;
  size: string[];
  category: string;
  stock: number;
  rating: number;
}
const initialOpinion = {
  id: Date.now(),
  name: "",
  rating: 5,
  description: "",
};

const Product = () => {
  const [selected, setSel] = useState(-1);
  const [visibilityOp, setVisib] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newOp, setnewOp] = useState<Opinion>(initialOpinion);
  const { id } = useParams();
  const [sizeError, setSizeErr] = useState(false);
  const [LoginError, setLoginError] = useState(false);

  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    title: "",
    image: "",
    size: [],
    stock: 0,
    rating: 0,
    category: "",
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapiserver.reactbd.org/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const raw = sessionStorage.getItem("userInfo");
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.loggedIn) setUserData(data.userData);
    }
  };
  return (
    <div>
      <div>
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <img
          style={{
            width: "auto",
            height: "105vh",
          }}
          src={product.image}
          alt=""
        />
        <div style={{ margin: "10vw", width: "30vw" }}>
          <p className="comments">New</p>
          <p style={{ fontSize: "170%", fontWeight: "bold" }}>
            {product.title}
          </p>
          <p style={{ fontSize: "140%", fontWeight: "inherit" }}>
            {String(product.price).includes(".") ? product.price: product.price + ".00" } $
          </p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {product.size.map((size, id) => {
              return (
                <button
                  style={{
                    width: "10%",
                    height: "100%",
                    margin: "0.5vw",
                    marginTop: "3vh",
                    borderRadius: "10%",
                    border: `${
                      selected !== id ? "1px solid black" : "1px solid white"
                    }`,
                    backgroundColor: `${selected !== id ? "white" : "black"}`,
                    color: `${selected !== id ? " black" : "white"}`,
                  }}
                  onClick={() => {
                    setSel(id);
                    setSizeErr(false);
                  }}
                >
                  {size}
                </button>
              );
            })}
          </div>
          <div
            className="error"
            style={{
              fontSize: "70%",
            }}
            hidden={!sizeError}
          >
            Choose size firstly
          </div>
          <Quantity max={product.stock}></Quantity>
          <p className="comments">In stock: {product.stock}</p>
          <button
            className={
              selected === -1 || !userData ? "accept-bt_nonactive" : "accept-bt"
            }
            style={{ width: "40vh", justifySelf: "center" }}
            onClick={() => {
              if (selected === -1) {
                setSizeErr(true);
              } else if (!userData) {
                setLoginError(true);
              }
            }}
          >
            Add to Shopping Bag
          </button>
          <div
            className="error"
            style={{
              fontSize: "70%",
            }}
            hidden={!LoginError}
          >
            Sign in to add product to your cart
          </div>
          <p className="comments" style={{}}>
            Category: {product.category}
          </p>
          <p
            style={{
              fontSize: "90%",
              fontWeight: "inherit",
              marginTop: "3vh",
            }}
          >
            <b>Description:</b>
            <br /> {product.description}
          </p>
          <p
            style={{
              fontSize: "90%",
              fontWeight: "inherit",
              marginTop: "3vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <b>Rating:</b>{" "}
            <Rating name="read-only" value={product.rating} readOnly />
          </p>
          <div>
            <button
              style={{
                justifySelf: "flex-start",
                marginLeft: "0%",
                fontSize: "87%",
                height: "95%",
                borderRadius: "0",
              }}
              className="accept-bt"
              onClick={() => setVisib(!visibilityOp)}
            >
              Opinions
            </button>
            <div hidden={!visibilityOp || opinions.length !== 0}>
              There are no opinions about the product yet
            </div>
            <div hidden={!visibilityOp}>
              {opinions.map((opinion, _id) => {
                return (
                  <div
                    style={{
                      border: "1px solid black",
                      borderRadius: "1vh",
                      width: "100%",
                      minHeight: "10vh",
                      margin: "2vh",
                      padding: "2%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "105%",
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <b>{opinion.name}</b>
                      <p>
                        <Rating
                          name="read-only"
                          value={opinion.rating}
                          readOnly
                        />
                      </p>
                    </p>
                    <hr />
                    <br />
                    <text style={{ whiteSpace: "pre-wrap" }}>
                      {opinion.description}
                    </text>
                  </div>
                );
              })}
            </div>
            <div
              hidden={!visibilityOp || isOpen || userData === null}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                marginTop: "5%",
              }}
              onClick={() => setIsOpen(true)}
            >
              Add an opinion
            </div>
            <div
              className="comments"
              hidden={userData !== null || !visibilityOp}
              style={{
                marginTop: "5%",
              }}
            >
              Sign in to add an opinion
            </div>
            <div hidden={!isOpen || !visibilityOp}>
              <div
                style={{
                  border: "1px solid black",
                  borderRadius: "1vh",
                  width: "100%",
                  minHeight: "10vh",
                  margin: "2vh",
                  padding: "2%",
                }}
              >
                <p
                  style={{
                    fontSize: "100%",
                    justifyContent: "space-between",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <input
                    value={newOp.name}
                    style={{
                      paddingLeft: "1%",
                      paddingRight: "1%",
                      paddingTop: "0.5%",
                      paddingBottom: "0.5%",
                    }}
                    type="text"
                    placeholder="Your name"
                    onChange={(e) =>
                      setnewOp({ ...newOp, name: e.target.value })
                    }
                  />
                  <p>
                    <Rating
                      name="simple-controlled"
                      value={newOp.rating}
                      onChange={(event, newValue) => {
                        setnewOp({ ...newOp, rating: newValue ?? 0 });
                      }}
                    />
                  </p>
                </p>
                <hr />
                <br />
                <textarea
                  placeholder="Opinion"
                  value={newOp.description}
                  style={{
                    width: "100%",
                    paddingLeft: "1%",
                    paddingRight: "1%",
                    paddingTop: "0.5%",
                    paddingBottom: "0.5%",
                  }}
                  onChange={(e) =>
                    setnewOp({ ...newOp, description: e.target.value })
                  }
                  rows={3}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{
                      width: "40%",
                      marginRight: "0",
                      marginBottom: "0",
                    }}
                    className="accept-bt_reverse"
                    onClick={() => {
                      setIsOpen(false);
                      setnewOp(initialOpinion);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      width: "40%",
                      marginRight: "0",
                      marginBottom: "0",
                    }}
                    className="accept-bt"
                    onClick={() => {
                      const finalOpinion = {
                        ...newOp,
                        name: newOp.name.trim() === "" ? "Anonim" : newOp.name,
                        description:
                          newOp.description.trim() === ""
                            ? "No description"
                            : newOp.description,
                        id: Date.now(),
                      };

                      setOpinions((prev) => [...prev, finalOpinion]);
                      setnewOp(initialOpinion);
                      setIsOpen(false);
                    }}
                  >
                    Add opinion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
