import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Container, grahContainer, headingContainer, headingStyle } from "../Stats/Styles";
import { Box, Typography } from "@mui/material";
Chartjs.register(ArcElement, Title, Tooltip, Legend);

export default function DoughnutChart({
  text,
}: {

  text: string;
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
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box sx={Container}>
        <Box sx = {headingContainer}>
            <Typography sx={headingStyle}>{text}</Typography>
        </Box>
      <Box sx={grahContainer}>
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
}
