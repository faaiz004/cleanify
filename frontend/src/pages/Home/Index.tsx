import Box from "@mui/material/Box";
import {
  buttonStyle,
  imageContainer,
  mainTextStyle,
  root,
  secondaryTextStyle,
  textAndImageContainer,
  textBox,
} from "./Styles.tsx";
import { Button, Typography } from "@mui/material";
import { Img } from "react-image";
import GrabageCollection from "../../assets/GarbageCollection.svg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={root}>
      <Box sx={textAndImageContainer}>
        {/* this is the box for the text */}
        <Box sx={textBox}>
          <Typography sx={mainTextStyle}>
            Making Your Cities Cleaner, One Smart Route at a Time
          </Typography>
          <Typography sx={secondaryTextStyle}>
            Optimize your city's waste management with Cleanify, the leading
            AI-driven solution for smarter, more efficient garbage collection.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                sm: "center",
                lg: "flex-start",
              },
              alignItems: "center",
              width: "70%",
              marginTop: "10px",
            }}
          >
            <Button sx={buttonStyle} onClick={() => navigate("/register")}>
              Join Us Now!
            </Button>
          </Box>
        </Box>
        <Box sx={imageContainer}>
          <Box
            sx={{
              height: {
                xs: "400px",
                sm: "400px",
                md: "400px",
                lg: "550px",
              },
              width: {
                xs: "400px",
                sm: "400px",
                md: "400px",
                lg: "550px",
              },
            }}
          >
            {/* this is the image box*/}
            <Img
              src={GrabageCollection}
              alt="Garbage Collection"
              height="100%"
              width="100%"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
