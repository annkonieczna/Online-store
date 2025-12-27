import { useState } from "react";
import { Link } from "react-router-dom";

export default function () {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [email2, setEmail2] = useState("");
  const [pass2, setPass2] = useState("");
  const [email_error, setEmErr] = useState(false);
  const [pass_error, setPasErr] = useState(false);

  const [email_empty, setEmEmp] = useState(false);
  const [pass_empty, setPassEmp] = useState(false);
  const [email2_empty, setEm2Emp] = useState(false);
  const [pass2_empty, setPass2Emp] = useState(false);

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
              Sign Up
            </p>
            <br />
            <div className="forms">
              <div>
                {" "}
                <label className="label">
                  Email*:
                  <input
                    className={` ${
                      email_error || email_empty ? "input-err" : "input"
                    }`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <p className="error" hidden={!email_empty}>
                  This field is mandatory
                </p>
                <label className="label">
                  Repeat email*:
                  <input
                    className={` ${
                      email_error || email2_empty ? "input-err" : "input"
                    }`}
                    type="email"
                    value={email2}
                    onChange={(e) => setEmail2(e.target.value)}
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
                    className={` ${
                      pass_error || pass_empty ? "input-err" : "input"
                    }`}
                    type="text"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </label>
                <p className="error" hidden={!pass_empty}>
                  This field is mandatory
                </p>
                <label className="label">
                  Repeat password*:
                  <input
                    className={` ${
                      pass_error || pass2_empty ? "input-err" : "input"
                    }`}
                    type="text"
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
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
              className="accept-bt"
              onClick={() => {
                setEmErr(validate(email, email2));
                setPasErr(validate(pass, pass2));
                setEmEmp(email === "");
                setPassEmp(pass === "");
                setEm2Emp(email2 === "");
                setPass2Emp(pass2 === "");
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
      </main>
      <footer></footer>
    </>
  );
}
