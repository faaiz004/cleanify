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
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    const emailRegex = /^\w+@[a-zA-Z_\.]+\.[a-zA-Z]{2,4}$/;

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
    
    setError((prevError) => ({ ...prevError, password: "" }));



    // Perform actual registration logic here (e.g., API call)
    console.log("Registration successful! (placeholder)"); // Simulate success

    // Clear form fields (optional)
    setEmail("");
    setPassword("");
  };

  return (
    <Box sx={root}>
      {/* this is the box for the text */}
      <Box sx={textContainer}>
        <Typography sx={textStyles}>Already Making a Difference?</Typography>
        <Typography sx={subTextStyles}>
        Let's Keep It Going!
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
          <Button sx={buttonStyle} onClick={handleSignIn}>
            Sign In
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
            Don't have an account?{" "}
            <Typography
              color="primary"
              style={{ cursor: "pointer", display: "inline" }}
            >
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Register
              </Link>
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
