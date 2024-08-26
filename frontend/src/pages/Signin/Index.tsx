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
import Cleanify from "../../assets/cleanifyLogo.svg";
import { Img } from "react-image";
import { Link } from "react-router-dom";
import { login } from "../../services/Auth/Index";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

interface ErrorType{
  email:string
  password:string
}

export default function SignIn() {
  const dispatch = useDispatch()
  const [loading,setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ErrorType>({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
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

    // Clear form fields (optional)
    setEmail("");
    setPassword("");

    // Perform actual registration logic here (e.g., API call)
    try {
      setLoading(true)
      const response : any = await login(email,password)
      dispatch(setUser({
        name: response?.name || '',
        email: response?.email || '',
        access_token: response?.data || '',
        type: response?.type || '',
    }));
    setLoading(false)
    } catch (error: any) {
      console.log('error',error, typeof(error))
      console.log('checking: ',error?.Error)
      setLoading(false)
      setError((prevError) => ({
        ...prevError,
        password: error?.response?.data?.message || error?.Error || 'Something went wrong, please try again'
      }))
      return;
    }
    setLoading(false);
    setError((prevError) => ({ ...prevError, password: "" }));
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
          <Button sx={buttonStyle} onClick={handleSignIn} disabled = {loading}>
            Sign In
          </Button>
          <Box
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
                to = '/signin'
                style={{ textDecoration: "none", color: "inherit" }}
              >
                register using our app!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
