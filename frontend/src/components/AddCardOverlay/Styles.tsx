import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
    border: "2px dashed gray",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: {
      sm: '180px',
      md: '200px',
      lg: '250px',
    },
    height: '100%',
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  };