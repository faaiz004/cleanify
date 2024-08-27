import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import { root } from "./Styles";

export default function AddCardOverlay({
  onAdd,
}: {
  onAdd : () => void;
}) {
  return (
    <Box
      sx={root}
      onClick = {onAdd}
    >
      <AddIcon sx={{ fontSize: 40, color: "gray" }} />
      <Typography variant="h6" sx={{ color: "gray", marginLeft: 1 }}>
        Add Card
      </Typography>
    </Box>
  );
}
