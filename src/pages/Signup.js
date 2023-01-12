import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Signup.css";
const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    age: "",
    doc: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((signupData) => ({ ...signupData, [name]: value }));
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (confirmPassword !== signupData.password) {
      alert("Passwords dont' match!");
    }
    fetch("http://127.0.0.1:3000/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signupData),
    }).then((r) => {
      if (r.ok) {
        r.json()
          .then((user) => {
            setUser(user);
          })
          .then(() => navigate("/"));
      } else {
        r.json().then((json) => setErrors(json.errors));
      }
    });
  };

  return (
    <div className="signup">
      <h1>Get started</h1>
      <form onSubmit={handleSignUpSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={signupData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signupData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          name="birthdate"
          placeholder="Birthdate"
          value={signupData.birthdate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={signupData.age}
          onChange={handleChange}
        />
        <label>
          Doctor
          <input
            type="checkbox"
            name="doc"
            checked={signupData.doc}
            onChange={(e) =>
              handleChange({ target: { name: "doc", value: e.target.checked } })
            }
          />{" "}
        </label>
        <div className="gender-radio">
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="female">Female</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {errors.length > 0 ? (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Signup;
