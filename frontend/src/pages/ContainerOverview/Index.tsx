import React, { useState } from 'react';
import {
  Grid,
  Select,
  MenuItem,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Drawer,
  Box,
  Button
} from '@mui/material';
import {
  StyledContainer,
  Title,
  AddButton,
  Filters,
  StyledTable,
  Image,
  FeedbackButton
} from './Styles';
import { Bar, Line } from 'react-chartjs-2'; // Import Chart and Line components
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement } from 'chart.js'; // Chart.js required imports

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement, PointElement);

interface ContainerData {
  id: string;
  image: string;
  status: string;
  address: string;    // Address/Region
  fillLevel: number;  // Fill Level
  capacity: number;   // Capacity in liters
}

// Add dummy data for containers
const containerData: ContainerData[] = [
  {
    id: 'C001',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region A',
    fillLevel: 65,
    capacity: 2000,
  },
  {
    id: 'C002',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region B',
    fillLevel: 30,
    capacity: 1500,
  },
  {
    id: 'C003',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 80,
    capacity: 1800,
  },
  {
    id: 'C004',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 20,
    capacity: 2500,
  },
  {
    id: 'C005',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 90,
    capacity: 2200,
  },
  {
    id: 'C006',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 75,
    capacity: 1700,
  },
  {
    id: 'C007',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 10,
    capacity: 2300,
  },
  {
    id: 'C008',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 50,
    capacity: 1900,
  },
  {
    id: 'C009',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 70,
    capacity: 2100,
  },
  {
    id: 'C010',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 15,
    capacity: 2400,
  }, 
  {
    id: 'C011',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 85,
    capacity: 1600,
  },
  {
    id: 'C012',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 60,
    capacity: 1750,
  },
  {
    id: 'C013',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 25,
    capacity: 2450,
  },
  {
    id: 'C014',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 95,
    capacity: 2250,
  },
  {
    id: 'C015',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 72,
    capacity: 1725,
  },
  {
    id: 'C016',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 12,
    capacity: 2325,
  },
  {
    id: 'C017',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 55,
    capacity: 1925,
  },
  {
    id: 'C018',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 75,
    capacity: 2125,
  },
  {
    id: 'C019',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 18,
    capacity: 2425,
  },
  {
    id: 'C020',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 88,
    capacity: 1625,
  }
  // Add more dummy containers as needed
];

const getStatusIcon = (status: string) => {
  const color = status === "Working" ? "green" : "red";
  return <span style={{ color, marginRight: 8 }}>●</span>;
};

const ContainerOverview: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [regionFilter, setRegionFilter] = useState("All regions");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  // Toggle feedback drawer
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Filter and paginate containers
  const filteredData = containerData
    .filter(container =>
      (statusFilter === "All statuses" || container.status === statusFilter) &&
      (regionFilter === "All regions" || container.address === regionFilter) &&
      (container.id.toLowerCase().includes(searchText.toLowerCase()))
    )
    .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  // Chart data
  const fillLevelData = {
    labels: filteredData.map(container => container.id),
    datasets: [
      {
        label: 'Fill Level (%)',
        data: filteredData.map(container => container.fillLevel),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const capacityData = {
    labels: filteredData.map(container => container.id),
    datasets: [
      {
        label: 'Capacity (Liters)',
        data: filteredData.map(container => container.capacity),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <StyledContainer maxWidth="xl">
      <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
        <Grid item>
          <Title>Container Overview</Title>
        </Grid>
        <Grid item>
          <AddButton variant="contained">+ Add containers</AddButton>
        </Grid>
      </Grid>

      <Filters>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              InputProps={{
                sx: {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '50px',
                  },
                },
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              variant="outlined"
              sx={{ borderRadius: '50px' }}
            >
              <MenuItem value="All statuses">All statuses</MenuItem>
              <MenuItem value="Working">Working</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              variant="outlined"
              sx={{ borderRadius: '50px' }}
            >
              <MenuItem value="All regions">All regions</MenuItem>
              <MenuItem value="Region A">Region A</MenuItem>
              <MenuItem value="Region B">Region B</MenuItem>
              <MenuItem value="Region C">Region C</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Filters>

      <StyledTable>
        <TableHead sx={{ height: '60px', backgroundColor: '#f7f7f7' }}>
          <TableRow>
            <TableCell>Container ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Address/Region</TableCell>
            <TableCell>Fill Level (%)</TableCell>
            <TableCell>Capacity (Liters)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((container, index) => {
            const rowStyle = index % 2 === 0
              ? { backgroundColor: '#ffffff' }
              : { backgroundColor: '#f7f7f7' };

            return (
              <TableRow key={container.id} style={{ ...rowStyle, height: '60px' }}>
                <TableCell>
                  <Image src={container.image} alt={container.id} />
                  {container.id}
                </TableCell>
                <TableCell>
                  {getStatusIcon(container.status)}
                  {container.status}
                </TableCell>
                <TableCell>{container.address}</TableCell>
                <TableCell>{container.fillLevel}%</TableCell>
                <TableCell>{container.capacity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </StyledTable>

      {/* Pagination Buttons */}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
          }}
          disabled={(currentPage + 1) * rowsPerPage >= containerData.length}
        >
          Next
        </Button>
      </Box>

      {/* Feedback Button that toggles the Drawer */}
      <FeedbackButton onClick={toggleDrawer(true)}>
        <Typography variant="caption">Feedback</Typography>
      </FeedbackButton>

      {/* Drawer that slides in from the right */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: '50vw', padding: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            Container Analytics
          </Typography>
          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              Fill Level of Containers:
            </Typography>
            <Bar data={fillLevelData} />
          </Box>
          <Box mb={3}>
            <Typography variant="body1" gutterBottom>
              Capacity of Containers (Line Chart):
            </Typography>
            <Line data={capacityData} />
          </Box>
        </Box>
      </Drawer>
    </StyledContainer>
  );
};

export default ContainerOverview;