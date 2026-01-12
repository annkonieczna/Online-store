import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import axios from "axios";

export default function () {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [email_empty, setEmEmp] = useState(false);
  const [pass_empty, setPassEmp] = useState(false);
  const [userData, setUserData] = useState({ email: "" });

  const navigate = useNavigate();

  function validate(x: any, y: any) {
    return x !== y;
  }
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("authtoken");
      const response = await axios.get("http://localhost:3000/auth/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.data.success) {
        console.log("user", response.data.data);
        setUserData(response.data.data);
        let userData = {
          loggedIn: true,
          userData: response.data.data,
        };
        sessionStorage.setItem("userInfo", JSON.stringify(userData));
      } else console.log(response.data.message || "failed to load data");
    } catch (error: any) {
      console.error("Error during fetching data:", error);
      console.log(error.response?.data?.message || "error occurred");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formValues);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: formValues.email,
        password: formValues.password,
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message || "Login successfull!");
        console.log(response);
        setFormValues({
          email: "",
          password: "",
        });
        const token = response.data.token;
        sessionStorage.setItem("authtoken", token);
        fetchUserData();

        navigate("/", { replace: true });
      } else toast.error(response.data.message || "Login failed");
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error(
        error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };
  return (
    <>
      <header className="heading">
        <Link to="/">
          <button className="button cursor-pointer flex flex-row name">
            ANONYMOUS
          </button>
        </Link>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="forms_bckgr">
            <div className="form_side">
              <p
                style={{
                  fontSize: "7vh",
                  fontWeight: "inherit",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Sign In
              </p>
              <br />
              <div className="forms">
                <div>
                  {" "}
                  <label className="label">
                    Email*:
                    <input
                      className={` ${email_empty ? "input-err" : "input"}`}
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleInput}
                    />
                  </label>
                  <p className="error" hidden={!email_empty}>
                    This field is mandatory
                  </p>
                </div>
                <div>
                  <label className="label">
                    Password*:
                    <input
                      className={` ${pass_empty ? "input-err" : "input"}`}
                      type="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleInput}
                    />
                  </label>
                  <p className="error" hidden={!pass_empty}>
                    This field is mandatory
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "70%",
                    justifySelf: "flex-end",
                  }}
                >
                  {" "}
                  Mandatory fields*
                </p>
              </div>
              <button
                style={{ width: "100%" }}
                type="submit"
                className="accept-bt"
                onClick={() => {
                  setEmEmp(formValues.email === "");
                  setPassEmp(formValues.password === "");
                }}
              >
                Continue
              </button>
              <p
                style={{
                  fontSize: "medium",
                  bottom: "20%",
                  right: "30%",
                  textAlign: "center",
                }}
              >
                Don't have an account?{" "}
                <Link className="link" to="/SignUp">
                  Sign up
                </Link>
              </p>
            </div>
            <img
              src="https://i.pinimg.com/1200x/e3/2b/3d/e32b3d7818b342be0dfe4f2255542040.jpg"
              alt=""
              style={{
                height: "95vh",
                position: "fixed",
                right: "0%",
                bottom: "0%",
              }}
            />
          </div>
        </form>
      </main>
      <footer></footer>
    </>
  );
}
