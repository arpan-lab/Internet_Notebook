import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successsfully","success")
      } else {
        props.showAlert("Invalid Detials","danger");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            placeholder="Name"
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            minLength={5}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            placeholder="Confirm Password"
            minLength={5}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
