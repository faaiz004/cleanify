import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

export default function AddCardOverlay({
  onAdd,
}: {
  onAdd : () => void;
}) {
  return (
    <Box
      sx={{
        border: "2px dashed gray",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "300px",
        width: "250px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      onClick = {onAdd}
    >
      <AddIcon sx={{ fontSize: 40, color: "gray" }} />
      <Typography variant="h6" sx={{ color: "gray", marginLeft: 1 }}>
        Add Card
      </Typography>
    </Box>
  );
}
