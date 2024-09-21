import React from 'react';
import {
  Grid,
  Select,
  MenuItem,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
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

interface ContainerData {
  id: string;
  image: string;
  status: string;
  address: string;    // Address/Region
  fillLevel: number;  // Fill Level
  capacity: number;   // Capacity in liters
}

const containerData: ContainerData[] = [
  { id: "CON-001", image: "/images/container1.png", status: "Working", address: "Region A", fillLevel: 60, capacity: 500 },
  { id: "CON-002", image: "/images/container2.png", status: "Working", address: "Region B", fillLevel: 75, capacity: 300 },
  { id: "CON-003", image: "/images/container3.png", status: "Working", address: "Region C", fillLevel: 40, capacity: 100 },
  { id: "CON-004", image: "/images/container4.png", status: "Inactive", address: "Region D", fillLevel: 0, capacity: 500 },
  { id: "CON-005", image: "/images/container5.png", status: "Working", address: "Region E", fillLevel: 85, capacity: 300 },
  { id: "CON-006", image: "/images/container6.png", status: "Working", address: "Region F", fillLevel: 30, capacity: 100 },
  { id: "CON-007", image: "/images/container7.png", status: "Working", address: "Region G", fillLevel: 90, capacity: 500 },
  { id: "CON-008", image: "/images/container8.png", status: "Inactive", address: "Region H", fillLevel: 0, capacity: 300 },
  { id: "CON-009", image: "/images/container9.png", status: "Working", address: "Region I", fillLevel: 55, capacity: 100 },
  { id: "CON-010", image: "/images/container10.png", status: "Working", address: "Region J", fillLevel: 95, capacity: 500 },
];

const getStatusIcon = (status: string) => {
  const color = status === "Working" ? "green" : "red";
  return <span style={{ color, marginRight: 8 }}>●</span>;
};

const ContainerOverview: React.FC = () => {
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
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              defaultValue="All statuses"
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
              defaultValue="All regions"
              variant="outlined"
              sx={{ borderRadius: '50px' }}
            >
              <MenuItem value="All regions">All regions</MenuItem>
              <MenuItem value="Region A">Region A</MenuItem>
              <MenuItem value="Region B">Region B</MenuItem>
              <MenuItem value="Region C">Region C</MenuItem>
              {/* Add other regions as needed */}
            </Select>
          </Grid>
        </Grid>
      </Filters>

      <StyledTable>
        <TableHead sx = {{
            height: '60px', // Increased header row height
            backgroundColor: '#f7f7f7', // Light grey background
          }}>
          <TableRow >
            <TableCell>Container ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Address/Region</TableCell>
            <TableCell>Fill Level (%)</TableCell>
            <TableCell>Capacity (Liters)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {containerData.map((container, index) => {
            const rowStyle = index % 2 === 0
              ? { backgroundColor: '#ffffff' }
              : { backgroundColor: '#f7f7f7' }; // Alternating between white and light grey
              
            return (
              <TableRow key={container.id} style={{ ...rowStyle, height: '60px' }}> {/* Increased row height */}
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

      <FeedbackButton>
        <Typography variant="caption">Feedback</Typography>
      </FeedbackButton>
    </StyledContainer>
  );
};

export default ContainerOverview;
