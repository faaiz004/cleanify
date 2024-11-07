// src/components/ContainerOverview.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Fab,
  Paper,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  Legend,
  LineElement,
  PointElement
);
interface ContainerData {
  id: string;
  image: string;
  status: string;
  address: string; // Address/Region
  fillLevel: number; // Fill Level
  capacity: number; // Capacity in liters
}

// Expanded dummy data for containers (30 entries)
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
  },
  {
    id: 'C021',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 77,
    capacity: 1850,
  },
  {
    id: 'C022',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 22,
    capacity: 2550,
  },
  {
    id: 'C023',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 68,
    capacity: 1950,
  },
  {
    id: 'C024',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 83,
    capacity: 1800,
  },
  {
    id: 'C025',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 14,
    capacity: 2480,
  },
  {
    id: 'C026',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 92,
    capacity: 2300,
  },
  {
    id: 'C027',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 78,
    capacity: 1750,
  },
  {
    id: 'C028',
    image: 'https://via.placeholder.com/50',
    status: 'Inactive',
    address: 'Region A',
    fillLevel: 17,
    capacity: 2375,
  },
  {
    id: 'C029',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region B',
    fillLevel: 85,
    capacity: 1680,
  },
  {
    id: 'C030',
    image: 'https://via.placeholder.com/50',
    status: 'Working',
    address: 'Region C',
    fillLevel: 73,
    capacity: 1780,
  },
];

const getStatusIcon = (status: string) => {
  const color = status === 'Working' ? 'green' : 'red';
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: color,
        marginRight: 1,
      }}
    />
  );
};

const ContainerOverview: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [regionFilter, setRegionFilter] = useState('All regions');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const rowsPerPage = 10;

  // Toggle drawer
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Filter and paginate containers
  const filteredData = containerData
    .filter(
      (container) =>
        (statusFilter === 'All statuses' || container.status === statusFilter) &&
        (regionFilter === 'All regions' || container.address === regionFilter) &&
        container.id.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  // Chart data
  const fillLevelData = {
    labels: filteredData.map((container) => container.id),
    datasets: [
      {
        label: 'Fill Level (%)',
        data: filteredData.map((container) => container.fillLevel),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const capacityData = {
    labels: filteredData.map((container) => container.id),
    datasets: [
      {
        label: 'Capacity (Liters)',
        data: filteredData.map((container) => container.capacity),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      {/* Header with Title */}
      <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h4" component="h1" color="primary">
            Container Overview
          </Typography>
        </Grid>
      </Grid>

      {/* Filters Section */}
      <Box sx={{ marginY: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search by ID"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              variant="outlined"
              sx={{
                borderRadius: '50px',
                height: '56px',
              }}
            >
              <MenuItem value="All statuses">All statuses</MenuItem>
              <MenuItem value="Working">Working</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              displayEmpty
              variant="outlined"
              sx={{
                borderRadius: '50px',
                height: '56px',
              }}
            >
              <MenuItem value="All regions">All regions</MenuItem>
              <MenuItem value="Region A">Region A</MenuItem>
              <MenuItem value="Region B">Region B</MenuItem>
              <MenuItem value="Region C">Region C</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Box>

      {/* Containers Table */}
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Container ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Address/Region
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Fill Level (%)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Capacity (Liters)
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" fontWeight="bold">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((container, index) => (
              <TableRow
                key={container.id}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa',
                  transition: 'background-color 0.3s',
                }}
              >
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box
                      component="img"
                      src={container.image}
                      alt={container.id}
                      sx={{ width: 50, height: 50, marginRight: 2, borderRadius: '8px' }}
                    />
                    <Typography variant="body1" fontWeight="medium">
                      {container.id}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {getStatusIcon(container.status)}
                    <Typography variant="body1">{container.status}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{container.address}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{container.fillLevel}%</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">{container.capacity}</Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Container">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/editcontainer/${container.id}`)}
                      sx={{
                        borderRadius: '50px',
                        textTransform: 'none',
                      }}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1">No containers found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Buttons */}
      <Box
        sx={{
          marginY: 4,
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
          }}
          disabled={currentPage === 0}
          sx={{
            borderRadius: '50px',
            paddingX: 4,
          }}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
          }}
          disabled={(currentPage + 1) * rowsPerPage >= containerData.length}
          sx={{
            borderRadius: '50px',
            paddingX: 4,
          }}
        >
          Next
        </Button>
      </Box>

      {/* Floating Action Button for Analytics */}
      <Fab
        color="secondary"
        aria-label="analytics"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={toggleDrawer(true)}
      >
        <Typography variant="caption" color="#fff">
          Overview
        </Typography>
      </Fab>

      {/* Drawer with Analytics Charts */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: { xs: '80vw', sm: '50vw' },
            padding: 4,
            backgroundColor: '#f9f9f9',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h5" gutterBottom color="primary">
            Container Analytics
          </Typography>
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Fill Level of Containers
            </Typography>
            <Bar
              data={fillLevelData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </Box>
          <Box mb={4}>
            <Typography variant="h6" gutterBottom>
              Capacity of Containers (Line Chart)
            </Typography>
            <Line
              data={capacityData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                },
              }}
            />
          </Box>
          <Box textAlign="right">
            <Button variant="contained" onClick={toggleDrawer(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
};

export default ContainerOverview;