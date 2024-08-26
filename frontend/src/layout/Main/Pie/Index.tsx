import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Title, Tooltip, Legend } from "chart.js";
import {
  Container,
  grahContainer,
  headingContainer,
  headingStyle,
} from "../Stats/Styles";
import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { ContainerType } from "../../../pages/Main/constants";
import { useMemo } from "react";

Chartjs.register(ArcElement, Title, Tooltip, Legend);

export default function DoughnutChart({
  text,
  editMode,
  onDelete,
  containers,
  fleetStatusData,
}: {
  text: string;
  editMode: boolean;
  onDelete?: any
  containers?: ContainerType[]
  fleetStatusData?:any;
}) {

  console.log("container", containers)

  // Memoize the data calculation to prevent unnecessary re-computations
  const { overflowing, full, normal, empty } = useMemo(() => {
    let overflowingCount = 0;
    let fullCount = 0;
    let normalCount = 0;
    let emptyCount = 0;

    if (containers) {
      containers.forEach((container) => {
        switch (container.status) {
          case 'Overflowing':
            overflowingCount++;
            break;
          case 'Full':
            fullCount++;
            break;
          case 'Normal':
            normalCount++;
            break;
          case 'Empty':
            emptyCount++;
            break;
          default:
            break;
        }
      });
    }

    return { overflowing: overflowingCount, full: fullCount, normal: normalCount, empty: emptyCount };
  }, [containers]);

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    cutoutPercentage: 50, // Increase this to make the graph more prominent (default is 50)
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10, // Decrease the font size of the labels
          },
        },
      },
    },
  };

  const data = {
    labels: [
      `Overflowing (${overflowing})`, 
      `Full (${full})`, 
      `Normal (${normal})`, 
      `Empty (${empty})`
    ],
    datasets: [
      {
        label: "Expenses",
        data: [overflowing,full,normal,empty],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",  // Red for Overflowing
          "rgba(255, 206, 86, 0.2)",  // Dark Yellow for Full
          "rgba(75, 192, 192, 0.2)",  // Green for Normal
          "rgba(54, 162, 235, 0.2)",  // Blue for Empty
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",    // Red for Overflowing
          "rgba(255, 206, 86, 1)",    // Dark Yellow for Full
          "rgba(75, 192, 192, 1)",    // Green for Normal
          "rgba(54, 162, 235, 1)",    // Blue for Empty
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box sx={Container}>
      <Box sx={headingContainer}>
        <Typography sx={headingStyle}>{text}</Typography>
        {editMode && (
        
        <DeleteIcon onClick = {onDelete} sx = {{cursor: 'pointer', color: 'gray'}}/>
      )}
      </Box>
      <Box sx={grahContainer}>
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
}
