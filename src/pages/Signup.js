import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SignUp({ setUser }) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [user, setUserData] = useState({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone: "",
      category: "doctor",
    });

     // Keep track of the changes made to the form
  function handleChanges(e) {
    console.log(e.target.name);
    setUserData({ ...user, [e.target.name]: e.target.value });
  }