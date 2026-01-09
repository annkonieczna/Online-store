import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Quantity from "../components/quantity";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Pencil } from "lucide-react";

interface Opinion {
  id: number;
  rating: number;
  title: string;
  context: string;
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
  id: 0,
  title: "",
  rating: 5,
  context: "",
};

const Product = () => {
  const [selected, setSel] = useState(-1);
  const [visibilityOp, setVisib] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [newOp, setnewOp] = useState<Opinion>(initialOpinion);
  const { id } = useParams();
  const [sizeError, setSizeErr] = useState(false);
  const [LoginError, setLoginError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [editingOpinionId, setEditingOpinionId] = useState<number | null>(null);
  const [editingOpinionData, setEditingOpinionData] =
    useState<Opinion>(initialOpinion);

  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [opinionsToEdit, setOpinionsToEdit] = useState<Opinion[]>([]);
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

  const [userData, setUserData] = useState({ id: 0, email: "", admin: 0 });

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (userData.id !== 0 && id) {
      fetchOpinionsToEdit();
    }
  }, [userData, id, opinions]);
  // useEffect(() => {
  //   fetch(`https://fakestoreapiserver.reactbd.org/api/products/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //     });
  //   fetchOpinions();
  // }, [id]);
  useEffect(() => {
    fetchProductData();
    fetchOpinions();
    fetch(`https://fakestoreapiserver.reactbd.org/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct((prev) => ({ ...prev, size: data.size }));
      });
  }, [id]);

  const handleEditOpinion = async (opinion: Opinion) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/users/editOpinion",
        {
          title: opinion.title || "Anonim",
          context: opinion.context || "No description",
          rating: opinion.rating,
          id: opinion.id,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(
          response.data.message || "Edited an opinion successfully!"
        );
        fetchOpinions();
      } else toast.error(response.data.message || "Failed to edit an opinion");
    } catch (error: any) {
      console.error("Error during editing an opinion:", error);
      toast.error(
        error.response.data.error.message ||
          error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };
  const handleAddingProductToCart = async () => {
    if (selected === -1) {
      setSizeErr(true);
      return;
    }

    if (!userData || userData.id === 0) {
      setLoginError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/cart/addProduct",
        {
          user_id: userData.id,
          product_id: Number(id),
          size: product.size[selected],
          quantity: quantity,
        }
      );

      if (response.data.success) {
        toast.success("Product added to cart 🛒");
      } else {
        toast.error(response.data.message || "Failed to add product to cart");
      }
    } catch (error: any) {
      console.error("Add to cart error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while adding to cart"
      );
    }
  };

  const handleEditProduct = async (rating: any, stock: any) => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/products/editProduct",
        {
          id: id,
          rating: rating,
          stock: stock,
        }
      );
      if (response.data.success) {
        fetchProductData();
      } else toast.error(response.data.message || "Failed to edit a product");
    } catch (error: any) {
      console.error("Error during editing a product:", error);
    }
  };

  const handleDeleteOpinion = async (opinionid: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/users/deleteOpinion/${opinionid}`
      );
      console.log(response.data);
      if (response.data.success) {
        fetchOpinions();
      } else
        toast.error(response.data.message || "Failed to delete an opinion");
    } catch (error: any) {
      console.error("Error during deleting an opinion:", error);
      toast.error(
        error.response.data.error.message ||
          error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  const handleAddOpinion = async (opinion: Opinion) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/addOpinion",
        {
          title: opinion.title || "Anonim",
          context: opinion.context || "No description",
          rating: opinion.rating,
          user_id: userData.id,
          product_id: id,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(
          response.data.message || "Added an opinion successfully!"
        );
        fetchOpinions();

        setnewOp(initialOpinion);
        setIsOpen(false);
      } else toast.error(response.data.message || "Failed to add an opinion");
    } catch (error: any) {
      console.error("Error during adding an opinion:", error);
      toast.error(
        error.response.data.error.message ||
          error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  const fetchOpinions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/getAllOpinions/${id}`
      );
      console.log(response);
      if (response.data.success) {
        console.log(response.data);
        setOpinions(response.data.data);
      } else console.log(response.data.message || "failed to load data");
    } catch (error: any) {
      console.log(error.response?.data?.message || "error occurred");
    }
  };
  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/${id}`);
      console.log("product", response.data.data);
      if (response.data.success) {
        setProduct((prev) => ({
          ...response.data.data[0],
          size: prev.size,
        }));
      } else console.log(response.data.message || "failed to load data");
    } catch (error: any) {
      console.log(error.response?.data?.message || "error occurred");
    }
  };
  const fetchOpinionsToEdit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/getUsersOpinions?productId=${id}&userId=${userData.id}`
      );
      console.log("opinions to edit", response);
      if (response.data.success) {
        console.log(response.data);
        setOpinionsToEdit(response.data.data);
      } else console.log(response.data.message || "failed to load data");
    } catch (error: any) {
      console.log(error.response?.data?.message || "error occurred");
    }
  };

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
            maxWidth: "50vw",
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
            {String(product.price).includes(".")
              ? product.price
              : product.price + ".00"}{" "}
            $
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
          <Quantity
            max={product.stock}
            value={quantity}
            onChange={setQuantity}
          />

          <p className="comments">In stock: {product.stock}</p>
          <button
            className={
              selected === -1 || !userData ? "accept-bt_nonactive" : "accept-bt"
            }
            style={{ width: "40vh", justifySelf: "center" }}
            onClick={() => {
              if (selected === -1) {
                setSizeErr(true);
                return;
              } else if (!userData) {
                setLoginError(true);
                return;
              }
              handleAddingProductToCart();
              // handleEditProduct(product.rating, product.stock - 1);
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
                  <div>
                    <div
                      hidden={editingOpinionId === opinion.id}
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
                        <b>{opinion.title}</b>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <p>
                            <Rating
                              name="read-only"
                              value={opinion.rating}
                              readOnly
                            />
                          </p>

                          <div
                            hidden={
                              !(
                                opinionsToEdit.some(
                                  (op) => op.id === opinion.id
                                ) || userData.admin === 1
                              )
                            }
                            className="delete"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteOpinion(opinion.id);
                            }}
                          >
                            <Trash2 />
                          </div>
                          <div
                            hidden={
                              !opinionsToEdit.some((op) => op.id === opinion.id)
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setEditingOpinionId(opinion.id);
                              setEditingOpinionData(opinion);
                            }}
                          >
                            <Pencil />
                          </div>
                        </div>
                      </p>
                      <hr />
                      <br />
                      <text style={{ whiteSpace: "pre-wrap" }}>
                        {opinion.context}
                      </text>
                    </div>
                    <div hidden={editingOpinionId !== opinion.id}>
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
                            value={editingOpinionData.title}
                            style={{
                              paddingLeft: "1%",
                              paddingRight: "1%",
                              paddingTop: "0.5%",
                              paddingBottom: "0.5%",
                            }}
                            type="text"
                            onChange={(e) =>
                              setEditingOpinionData({
                                ...editingOpinionData,
                                title: e.target.value,
                              })
                            }
                          />
                          <p>
                            <Rating
                              name="simple-controlled"
                              value={editingOpinionData.rating}
                              onChange={(event, newValue) => {
                                setEditingOpinionData({
                                  ...editingOpinionData,
                                  rating: newValue ?? 0,
                                });
                              }}
                            />
                          </p>
                        </p>
                        <hr />
                        <br />
                        <textarea
                          value={editingOpinionData.context}
                          style={{
                            width: "100%",
                            paddingLeft: "1%",
                            paddingRight: "1%",
                            paddingTop: "0.5%",
                            paddingBottom: "0.5%",
                          }}
                          onChange={(e) =>
                            setEditingOpinionData({
                              ...editingOpinionData,
                              context: e.target.value,
                            })
                          }
                          rows={3}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            style={{
                              width: "40%",
                              marginRight: "0",
                              marginBottom: "0",
                            }}
                            className="accept-bt_reverse"
                            onClick={() => {
                              setEditingOpinionId(null);
                              setEditingOpinionData(initialOpinion);
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
                                id: opinion.id,
                                rating: editingOpinionData.rating,
                                title:
                                  editingOpinionData.title.trim() === ""
                                    ? "Anonim"
                                    : editingOpinionData.title,
                                context:
                                  editingOpinionData.context.trim() === ""
                                    ? "No description"
                                    : editingOpinionData.context,
                              };
                              handleEditOpinion(finalOpinion);
                              setEditingOpinionId(null);
                              setEditingOpinionData(initialOpinion);
                            }}
                          >
                            Edit opinion
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              hidden={
                !visibilityOp ||
                isOpen ||
                userData === null ||
                opinionsToEdit.length > 0 ||
                userData.admin === 1
              }
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
                    value={newOp.title}
                    style={{
                      paddingLeft: "1%",
                      paddingRight: "1%",
                      paddingTop: "0.5%",
                      paddingBottom: "0.5%",
                    }}
                    type="text"
                    placeholder="Your name"
                    onChange={(e) =>
                      setnewOp({ ...newOp, title: e.target.value })
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
                  value={newOp.context}
                  style={{
                    width: "100%",
                    paddingLeft: "1%",
                    paddingRight: "1%",
                    paddingTop: "0.5%",
                    paddingBottom: "0.5%",
                  }}
                  onChange={(e) =>
                    setnewOp({ ...newOp, context: e.target.value })
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
                        title:
                          newOp.title.trim() === "" ? "Anonim" : newOp.title,
                        context:
                          newOp.context.trim() === ""
                            ? "No description"
                            : newOp.context,
                      };
                      handleAddOpinion(finalOpinion);
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
