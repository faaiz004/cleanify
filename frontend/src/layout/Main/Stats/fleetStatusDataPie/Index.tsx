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
import { useMemo } from "react";
import { VehicleType } from "../../../../pages/Main/constants.ts";
import { Skeleton } from "@mui/material";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

Chartjs.register(ArcElement, Title, Tooltip, Legend);

export default function DoughnutChartFleetData({
  text,
  editMode,
  onDelete,
  fleetStatusData,
  fleetStatusLoading,
  fleetStatusError,
}: {
  text: string;
  editMode: boolean;
  onDelete?: () => void;
  fleetStatusData?: VehicleType[];
  fleetStatusLoading?: boolean;
  fleetStatusError?: any;
}) {
  console.log("fleetStatusData in DoughnutChartFleetData: ", fleetStatusData);

  // Memoize the data calculation to prevent unnecessary re-computations
  const { working, unavailable, offWork } = useMemo(() => {
    let workingCount = 0;
    let unavailableCount = 0;
    let offWorkCount = 0;

    if (fleetStatusData) {
      fleetStatusData.forEach((vehicle: VehicleType) => {
        if (vehicle.status == "WORKING") {
          workingCount++;
        } else if (vehicle.status == "NOT_WORKING") {
          unavailableCount++;
        }
      });
    }

    return {
      working: workingCount,
      unavailable: unavailableCount,
      offWork: offWorkCount,
    };
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
          "rgba(75, 192, 192, 0.2)", // Green for Working
          "rgba(255, 99, 132, 0.2)", // Red for Unavailable
          "rgba(54, 162, 235, 0.2)", // Blue for Off Work
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Green for Working
          "rgba(255, 99, 132, 1)", // Red for Unavailable
          "rgba(54, 162, 235, 1)", // Blue for Off Work
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={Container}>
      {fleetStatusLoading ? (
        <>
          <Skeleton variant="rounded" width={"50%"} height={20} />
          <Skeleton variant="rounded" width={"90%"} height={"80%"} />
        </>
      ) : fleetStatusError ? (
        <>
          <ErrorOutlinedIcon
            sx={{ color: "#990000", width: "50%", height: "50%" }}
          />
          <Typography
            variant="h6"
            sx={{ color: "#990000", textAlign: "center" }}
          >
            Error displaying container information
          </Typography>
        </>
      ) : (
        <>
          <Box sx={headingContainer}>
            <Typography sx={headingStyle}>{text}</Typography>
            {editMode && (
              <DeleteIcon
                onClick={onDelete}
                sx={{ cursor: "pointer", color: "gray" }}
              />
            )}
          </Box>
          <Box sx={grahContainer}>
            <Doughnut data={data} options={options} />
          </Box>
        </>
      )}
    </Box>
  );
}
