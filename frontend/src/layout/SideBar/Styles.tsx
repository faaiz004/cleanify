import { SxProps, Theme } from "@mui/material";


export const dividerStyle: SxProps<Theme> = {
    width: "90%",
    height: "0.5px",
    border: "1px solid #000", // Corrected hex code
    borderRadius: "5px",
    backgroundColor: "#000", // Add background color to make it visible
    marginLeft: "auto",
    marginRight: "auto",
};