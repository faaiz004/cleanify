import { useState } from "react";
import Box from "@mui/material/Box";
import {
  feature1Box,
  feature1ImageBox,
  feature1mainText,
  feature1subText,
  feature1textBox,
  root,
  textFiledStyling,
    footerContainer,
    footerText,
    socialIconsContainer,
    socialIcon

} from "./Styles";
import Navigation from "../../assets/Navigation.png";
import GarbageTruck2 from "../../assets/GarbageTruck2.png";
import CleanCity from "../../assets/CleanCity.png";
import { Img } from "react-image";
import { Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


export default function Index() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({ email: "", message: "" });
  
    const handleSubmit = () => {
      let valid = true;
      let emailError = "";
      let messageError = "";
  
      // Validate email
      const emailRegex = /^\w+@[a-zA-Z_\.]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        emailError = "Please enter a valid email address.";
        valid = false;
      }
  
      // Validate message
      if (!message.trim()) {
        messageError = "Please enter a message.";
        valid = false;
      }
  
      setErrors({ email: emailError, message: messageError });
  
      if (valid) {
        // Perform actual submission logic here (e.g., API call)
        console.log("Message sent successfully! (placeholder)");
  
        // Clear form fields
        setEmail("");
        setMessage("");
      }
    };
  return (
    <Box sx={root}>
      {/* this is the box for the first feature */}
      <Box sx={{...feature1Box, flexDirection: {
        xs: 'column-reverse',
        sm: 'row',
      }}}>
        <Box sx={feature1ImageBox}>
          <Img src={Navigation} alt="Navigation" width="90%" />
        </Box>
        <Box sx={feature1textBox}>
          <Typography sx={feature1mainText}>
            Cleanify at Your Fingertips
          </Typography>
          <Typography sx={feature1subText}>
            Our innovative app brings the power of AI to waste management,
            helping you streamline routes, reduce emissions, and ensure cleaner
            cities. Accessible anywhere, anytime, Cleanify puts smart solutions
            in the palm of your hand.
          </Typography>
        </Box>
      </Box>
      <Box sx={feature1Box}>
        <Box sx={feature1textBox}>
          <Typography sx={feature1mainText}>
            Empowering Those Who Keep Our Cities Clean
          </Typography>
          <Typography sx={feature1subText}>
            We're dedicated to supporting the unsung heroes of our communities.
            Cleanify provides drivers with the most efficient routes, ensuring a
            smoother, safer, and more productive workday
          </Typography>
        </Box>
        <Box sx={feature1ImageBox}>
          <Img src={GarbageTruck2} alt="Garbage Truck" width="90%" />
        </Box>
      </Box>
      <Box sx={{...feature1Box, flexDirection: {
        xs: 'column-reverse',
        sm: 'row',
      }}}>
        <Box sx={feature1ImageBox}>
          <Img src={CleanCity} alt="Garbage Truck" width="90%" />
        </Box>
        <Box sx={feature1textBox}>
          <Typography sx={feature1mainText}>A Greener Tomorrow</Typography>
          <Typography sx={feature1subText}>
            At Cleanify, our mission is to create sustainable, waste-free urban
            environments. We believe in a future where technology and community
            efforts come together to keep our cities green and clean.
          </Typography>
        </Box>
      </Box>
      <Box sx={feature1Box}>
        <Box sx={feature1textBox}>
          <Typography sx={feature1mainText}>Reach Out To Our Team</Typography>
          <Typography sx={feature1subText}>
            Have any questions or feedback? We'd love to hear from you. Reach
            out to our team by filling out the form below, and we'll get back to
            you as soon as possible.
          </Typography>
        </Box>
        <Box sx={feature1textBox}>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={textFiledStyling}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            id="standard-multiline-flexible"
            placeholder="enter your message here"
            multiline
            rows={8}
            maxRows={8}
            sx = {textFiledStyling}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={!!errors.message}
            helperText={errors.message}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Send Us A Message
            </Button>
        </Box>
      </Box>
      <Box sx={footerContainer}>
        <Typography sx={footerText}>
          © 2024 Cleanify. All rights reserved.
        </Typography>
        <Box sx={socialIconsContainer}>
          <FacebookIcon sx={socialIcon} />
          <TwitterIcon sx={socialIcon} />
          <LinkedInIcon sx={socialIcon} />
        </Box>
      </Box>
    </Box>
  );
}
