import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FleetUsage } from '../constants';
import {
  Container,
  grahContainer,
  headingContainer,
  headingStyle,
} from '../Styles.tsx';

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  text: string;
  editMode: boolean;
  onDelete?: () => void;
  fleetUsageData?: FleetUsage[];
}

const BarChart: React.FC<BarChartProps> = ({
  text,
  editMode,
  onDelete,
  fleetUsageData = [],
}) => {
  // Process data from fleetUsageData
  const labels = fleetUsageData.map((item) => item.month); // or item.city, depending on what you want to display
  const dataValues = fleetUsageData.map((item) => item.kmsTravelled);

  const data = {
    labels,
    datasets: [
      {
        label: 'Kms Travelled',
        data: dataValues,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <Box sx={Container}>
      <Box sx={headingContainer}>
        <Typography sx={headingStyle}>{text}</Typography>
        {editMode && (
          <DeleteIcon
            onClick={onDelete}
            sx={{ cursor: 'pointer', color: 'gray' }}
          />
        )}
      </Box>

      <Box sx={grahContainer}>
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default BarChart;