import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function () {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  // const [email2, setEmail2] = useState("");
  // const [pass2, setPass2] = useState("");
  const [email_error, setEmErr] = useState(false);
  const [pass_error, setPasErr] = useState(false);

  const [email_empty, setEmEmp] = useState(false);
  const [pass_empty, setPassEmp] = useState(false);
  const [email2_empty, setEm2Emp] = useState(false);
  const [pass2_empty, setPass2Emp] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    repeatedEmail: "",
    repeatedPassword: "",
  });

  const navigate = useNavigate();

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formValues);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formValues
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message || "Registration successfull!");
        setFormValues({
          email: "",
          password: "",
          repeatedEmail: "",
          repeatedPassword: "",
        });
        navigate("/SignIn", { replace: true });
      } else toast.error(response.data.message || "Registration failed");
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast.error(
        error.response.data.error.message ||
          error.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  function validate(x: any, y: any) {
    return x !== y;
  }
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
                Sign Up
              </p>
              <br />
              <div className="forms">
                <div>
                  {" "}
                  <label className="label">
                    Email*:
                    <input
                      name="email"
                      className={` ${
                        email_error || email_empty ? "input-err" : "input"
                      }`}
                      type="email"
                      value={formValues.email}
                      onChange={handleInput}
                    />
                  </label>
                  <p className="error" hidden={!email_empty}>
                    This field is mandatory
                  </p>
                  <label className="label">
                    Repeat email*:
                    <input
                      name="repeatedEmail"
                      className={` ${
                        email_error || email2_empty ? "input-err" : "input"
                      }`}
                      type="email"
                      value={formValues.repeatedEmail}
                      onChange={handleInput}
                    />
                  </label>
                  <p className="error" hidden={!email2_empty}>
                    This field is mandatory
                  </p>
                  <p className="error" hidden={!email_error}>
                    This email does not match the above
                  </p>
                </div>
                <div>
                  <label className="label">
                    Password*:
                    <input
                      name="password"
                      className={` ${
                        pass_error || pass_empty ? "input-err" : "input"
                      }`}
                      type="password"
                      value={formValues.password}
                      onChange={handleInput}
                    />
                  </label>
                  <p className="error" hidden={!pass_empty}>
                    This field is mandatory
                  </p>
                  <label className="label">
                    Repeat password*:
                    <input
                      name="repeatedPassword"
                      className={` ${
                        pass_error || pass2_empty ? "input-err" : "input"
                      }`}
                      type="password"
                      value={formValues.repeatedPassword}
                      onChange={handleInput}
                    />
                  </label>
                  <p className="error" hidden={!pass2_empty}>
                    This field is mandatory
                  </p>

                  <p className="error" hidden={!pass_error}>
                    This password does not match the above
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
                type="submit"
                style={{ width: "100%" }}
                className="accept-bt"
                onClick={() => {
                  setEmErr(
                    validate(formValues.email, formValues.repeatedEmail)
                  );
                  setPasErr(
                    validate(formValues.password, formValues.repeatedPassword)
                  );
                  setEmEmp(formValues.email === "");
                  setPassEmp(formValues.password === "");
                  setEm2Emp(formValues.repeatedEmail === "");
                  setPass2Emp(formValues.repeatedPassword === "");
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
                Already have an account?{" "}
                <Link className="link" to="/SignIn">
                  Sign in
                </Link>
              </p>
            </div>
            <img
              src="https://i.pinimg.com/736x/2d/ec/82/2dec8221385576cbabae1f7844a97d7e.jpg"
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
