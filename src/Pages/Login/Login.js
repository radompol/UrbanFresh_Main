import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import Logo from "../../assets/Logo_main.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Login({ setLoggedIn, setLoggedIn_ }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const handleSignIn = async (userDetails) => {
    signInWithEmailAndPassword(
      getAuth(),
      userDetails.email,
      userDetails.password
    )
      .then((user) => {
        console.log(user);
        if (userDetails.email == "mrpjuanillo@gmail.com") {
          setLoggedIn(true);
          setLoggedIn_(false);
          window.localStorage.setItem("loggedIn", "yes");
          navigate("/home");
          swal("Login Successfully!", "Welcome Admin", "success");
        } else {
          window.localStorage.setItem("loggedIn", "");
          alert("Email and password does not match.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div
          style={{ justifyContent: "center", alignItems: "center" }}
          className={"Auth-form-content"}
        >
          <img className="mx-4" src={Logo} style={{ width: 300 }} />

          <div class="mb-3">
            <label for="" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              name=""
              id=""
              aria-describedby="emailHelpId"
              placeholder="abc@mail.com"
              onChange={(evt) => {
                setUserDetails((prev) => ({
                  ...prev,
                  email: evt.target.value,
                }));
              }}
            />
            <div class="mb-3">
              <label for="" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                name=""
                id=""
                onChange={(evt) => {
                  setUserDetails((prev) => ({
                    ...prev,
                    password: evt.target.value,
                  }));
                }}
                security={true}
                placeholder=""
              />
              <button
                class="btn btn-primary  form-control my-2"
                onClick={() => {
                  handleSignIn(userDetails);
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
