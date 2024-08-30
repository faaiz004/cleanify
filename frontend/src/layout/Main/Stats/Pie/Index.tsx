import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Title, Tooltip, Legend } from "chart.js";
import {
  Container,
  grahContainer,
  headingContainer,
  headingStyle,
} from "../Styles.tsx";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContainerType } from "../../../../pages/Main/constants";
import { useMemo } from "react";
import { Skeleton } from "@mui/material";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

Chartjs.register(ArcElement, Title, Tooltip, Legend);

export default function DoughnutChart({
  text,
  editMode,
  onDelete,
  containers,
  containerLoading,
  containerError,
}: {
  text: string;
  editMode: boolean;
  onDelete?: any;
  containers?: ContainerType[];
  containerLoading?: boolean;
  containerError?: any;
}) {

  // Memoize the data calculation to prevent unnecessary re-computations
  const { overflowing, full, normal, empty } = useMemo(() => {
    let overflowingCount = 0;
    let fullCount = 0;
    let normalCount = 0;
    let emptyCount = 0;

    if (containers && containers?.length > 0) {
      containers.forEach((container) => {
        switch (container.fill_status) {
          case "OVERFLOWING":
            overflowingCount++;
            break;
          case "FULL":
            fullCount++;
            break;
          case "NORMAL":
            normalCount++;
            break;
          case "EMPTY":
            emptyCount++;
            break;
          default:
            break;
        }
      });
    }

    return {
      overflowing: overflowingCount,
      full: fullCount,
      normal: normalCount,
      empty: emptyCount,
    };
  }, [containers]);


  console.log("container in pie", containers);
  console.log("containerLoading", containerLoading);
  console.log("containerError", containerError);

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
      `Empty (${empty})`,
    ],
    datasets: [
      {
        label: "Expenses",
        data: [overflowing, full, normal, empty],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Red for Overflowing
          "rgba(255, 206, 86, 0.2)", // Dark Yellow for Full
          "rgba(75, 192, 192, 0.2)", // Green for Normal
          "rgba(54, 162, 235, 0.2)", // Blue for Empty
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red for Overflowing
          "rgba(255, 206, 86, 1)", // Dark Yellow for Full
          "rgba(75, 192, 192, 1)", // Green for Normal
          "rgba(54, 162, 235, 1)", // Blue for Empty
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box sx={Container}>
      {containerLoading ? (
        <>
          <Skeleton variant="rounded" width={"50%"} height={20} />
          <Skeleton variant="rounded" width={"90%"} height={"80%"} />
        </>
      ): (
        containerError ? (
          <>
            <ErrorOutlinedIcon sx = {{color: '#990000', width: '50%', height: '50%'}}/>
            <Typography variant = "h6" sx = {{color: '#990000', textAlign: 'center'}}>Error displaying container information</Typography>
          
          </>
        ) : (
          <>
          <Box sx={headingContainer}>
            <Typography sx={headingStyle}>{text}</Typography>
            {editMode && (
            <DeleteIcon onClick = {onDelete} sx = {{cursor: 'pointer', color: 'gray'}}/>
          )}
          </Box>
          <Box sx={grahContainer}>
            <Doughnut data={data} options={options} />
          </Box>
          </>
        )
      )}
      

    </Box>
  );
}
