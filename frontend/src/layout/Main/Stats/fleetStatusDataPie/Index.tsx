import { Doughnut } from "react-chartjs-2";
import { Chart as Chartjs, ArcElement, Title, Tooltip, Legend } from "chart.js";
import {
  Container,
  grahContainer,
  headingContainer,
  headingStyle,
} from "../Styles.tsx";
import { Box, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo } from "react";

Chartjs.register(ArcElement, Title, Tooltip, Legend);

export default function DoughnutChartFleetData({
  text,
  editMode,
  onDelete,
  fleetStatusData,
}: {
  text: string;
  editMode: boolean;
  onDelete?: () => void;
  fleetStatusData?: any;
}) {

  // Memoize the data calculation to prevent unnecessary re-computations
  const { working, unavailable, offWork } = useMemo(() => {
    let workingCount = 0;
    let unavailableCount = 0;
    let offWorkCount = 0;

    if (fleetStatusData) {
      fleetStatusData.forEach((status: any) => {
        workingCount += status.working;
        unavailableCount += status.unavailable;
        offWorkCount += status.offWork;
      });
    }

    return { working: workingCount, unavailable: unavailableCount, offWork: offWorkCount };
  }, [fleetStatusData]);

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
      `Working (${working})`,
      `Unavailable (${unavailable})`,
      `Off Work (${offWork})`,
    ],
    datasets: [
      {
        label: "Fleet Status",
        data: [working, unavailable, offWork],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",  // Green for Working
          "rgba(255, 99, 132, 0.2)",  // Red for Unavailable
          "rgba(54, 162, 235, 0.2)",  // Blue for Off Work
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",    // Green for Working
          "rgba(255, 99, 132, 1)",    // Red for Unavailable
          "rgba(54, 162, 235, 1)",    // Blue for Off Work
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
          <DeleteIcon onClick={onDelete} sx={{ cursor: 'pointer', color: 'gray' }} />
        )}
      </Box>
      <Box sx={grahContainer}>
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
}
