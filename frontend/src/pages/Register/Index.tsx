import Box from "@mui/material/Box";
import { useState } from "react";
import {
  formContainer,
  root,
  textContainer,
  subTextStyles,
  textStyles,
  form,
  buttonStyle,
} from "./Styles";
import { Button, Typography } from "@mui/material";
import TextField from "../../components/TextField/Index";
import PasswordInput from "../../components/PasswordField/Index";
import Cleanify from "../../assets/Cleanify.svg";
import { Img } from "react-image";
import { Link } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleJoin = () => {
    const emailRegex = /^\w+@[a-zA-Z_\.]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?])[A-Za-z\d@$!%*?]{8,}$/;

    // Validate email
    if (!emailRegex.test(email)) {
      setError((prevError) => ({
        ...prevError,
        email: "Please enter a valid email address.",
      }));
      return;
    }
    setError((prevError) => ({ ...prevError, email: "" }));

    // Validate password
    if (!password.trim()) {
      setError((prevError) => ({
        ...prevError,
        password: "Please enter a valid password.",
      }));
      return;
    }
    if (!passwordRegex.test(password)) {
      if (!/[A-Z]/.test(password)) {
        setError((prevError) => ({
          ...prevError,
          password: "Password must contain an uppercase letter.",
        }));
        return;
      }
      if (!/[a-z]/.test(password)) {
        setError((prevError) => ({
          ...prevError,
          password: "Password must contain a lowercase letter.",
        }));
        return;
      }
      if (!/\d/.test(password)) {
        setError((prevError) => ({
          ...prevError,
          password: "Password must contain a number.",
        }));
        return;
      }
      if (!/[@$!%*?]/.test(password)) {
        setError((prevError) => ({
          ...prevError,
          password: "Password must contain a special character.",
        }));
        return;
      }
      if (password.length < 8) {
        setError((prevError) => ({
          ...prevError,
          password: "Password must be at least 8 characters long.",
        }));
        return;
      }
    }
    setError((prevError) => ({ ...prevError, password: "" }));

    // Validate confirm password
    if (password !== confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }
    setError((prevError) => ({ ...prevError, confirmPassword: "" }));

    // Perform actual registration logic here (e.g., API call)
    console.log("Registration successful! (placeholder)"); // Simulate success

    // Clear form fields (optional)
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Box sx={root}>
      {/* this is the box for the text */}
      <Box sx={textContainer}>
        <Typography sx={textStyles}>Become Part of a Cleaner Future</Typography>
        <Typography sx={subTextStyles}>
          First time here? Lets get you started!
        </Typography>
      </Box>
      {/* this is the box for the form */}
      <Box sx={formContainer}>
        <Box sx={form}>
          <Box
            sx={{
              height: {
                xs: "60px",
                sm: "70px",
                md: "100px",
              },
              textTransform: "none",
            }}
          >
            <Img
              src={Cleanify}
              alt="Cleanify"
              loader={<div>...loading</div>}
              style={{ height: "100%" }}
            />
          </Box>
          <TextField email={email} setEmail={setEmail} error={error.email} />
          <PasswordInput
            password={password}
            error={error.password}
            placeholder="Enter your password"
            setPassword={setPassword}
          />
          <PasswordInput
            password={confirmPassword}
            error={error.confirmPassword}
            placeholder="Confirm your password"
            setPassword={setConfirmPassword}
          />
          <Button sx={buttonStyle} onClick={handleJoin}>
            Join Us
          </Button>
          <Typography
            sx={{
              color: "black",
              fontSize: "14px",
              textAlign: "center",
              fontWeight: 400,
              fontFamily: "Raleway",
            }}
          >
            Already have an account?{" "}
            <Typography
              color="primary"
              style={{ cursor: "pointer", display: "inline" }}
            >
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
