import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, Typography } from "@mui/material";
import {
  Container,
  grahContainer,
  headingContainer,
  headingStyle,
} from "../Stats/Styles";
import DeleteIcon from '@mui/icons-material/Delete';

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
  text,
  editMode,
  onDelete,
}: {
  text: string;
  editMode: boolean;
  onDelete?: any;
}) {
  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
  };
  const data = {
    labels: ["Rent", "Food", "Transport", "Entertainment", "Shopping"],
    datasets: [
      {
        label: "Expenses",
        data: [1200, 500, 700, 1000, 800],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box sx={Container}>
      <Box sx={headingContainer}>
        <Typography sx={headingStyle}>{text}</Typography>
        {editMode && (
        <DeleteIcon onClick = {onDelete} sx = {{cursor: 'pointer', color: 'gray'}} />
      )}
      </Box>

      <Box sx={grahContainer}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
}
