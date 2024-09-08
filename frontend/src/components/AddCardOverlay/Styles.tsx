import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
    border: "2px dashed gray",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: '100%',
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  };