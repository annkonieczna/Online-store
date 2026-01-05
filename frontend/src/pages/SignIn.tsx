import { useState } from "react";
import { Link } from "react-router-dom";

export default function () {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [email_empty, setEmEmp] = useState(false);
  const [pass_empty, setPassEmp] = useState(false);

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
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
              className="accept-bt"
              onClick={() => {
                setEmEmp(email === "");
                setPassEmp(pass === "");
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
      </main>
      <footer></footer>
    </>
  );
}
