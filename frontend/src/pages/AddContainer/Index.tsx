import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Switch, FormControlLabel, Typography, Box, Grid, InputLabel, FormControl } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';

// Updated theme to match the new design
const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h6: {
      fontWeight: 700,
      fontSize: '24px',
      color: '#333333',
    },
    body1: {
      fontWeight: 400,
      fontSize: '16px',
      color: '#333333',
    },
  },
  palette: {
    primary: {
      main: '#007BFF',
    },
    secondary: {
      main: '#6C757D',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#007BFF',
          color: '#FFF',
          borderRadius: '8px',
          fontWeight: 'bold',
          padding: '12px 24px',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          '& input': {
            background: '#F8F9FA',
            color: '#333333',
            padding: '12px 15px',
            textAlign: 'left',
            borderRadius: '10px',
          },
          '& label': {
            color: '#666666',
          },
          '& label.Mui-focused': {
            color: '#007BFF',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '10px',
              borderColor: '#CCCCCC',
            },
            '&:hover fieldset': {
              borderColor: '#48819A',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#48819A',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          '& .MuiOutlinedInput-input': {
            textAlign: 'left',
            padding: '12px 15px',
            borderRadius: '10px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '10px',
              borderColor: '#CCCCCC',
            },
            '&:hover fieldset': {
              borderColor: '#48819A',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#48819A',
            },
          },
        },
      },
    },
  },
});

const EditContainerForm = () => {
  const [containerID, setContainerID] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [containerType, setContainerType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [dimensions, setDimensions] = useState({ height: 1, length: 1, width: 1 });
  const [truckType, setTruckType] = useState('');
  const [hardwareID, setHardwareID] = useState('');
  const [containerStatus, setContainerStatus] = useState('Available');
  const [enableCollection, setEnableCollection] = useState(false);
  const [location, setLocation] = useState<[number, number]>([51.505, -0.09]); // Default location
  const [emptyingStartTime, setEmptyingStartTime] = useState('00:00');
  const [emptyingEndTime, setEmptyingEndTime] = useState('00:00');
  const [excludeDays, setExcludeDays] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [useMap, setUseMap] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission logic here
  };

  const handleMapClick = (lat: number, lng: number) => {
    setLocation([lat, lng]);
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => setAddress(data.display_name));
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      }
    });

    return location === null ? null : (
      <Marker position={location} icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [38, 95] })} />
    );
  }

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        background: '#F1F1F1',
        padding: '50px 20px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <Typography gutterBottom align="center" sx={{ color: '#3C3C3C', marginBottom: '20px', fontFamily: 'Raleway', fontSize: '30px', fontWeight: 600 }}>
            Edit Container
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              {/* Left Column */}
              <Grid item xs={12} md={7}>
                <Box>
                  <Typography sx={{ marginBottom: '20px', fontFamily: 'Raleway', fontSize: '20px', fontWeight: 500, color: '#555555' }}>Container Details</Typography>
                  <InputLabel sx={{ color: '#666666', fontWeight: 'bold' }}>Container ID</InputLabel>
                  <TextField
                    required
                    fullWidth
                    value={containerID}
                    onChange={(e) => setContainerID(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., C12345"
                    sx={{ width: '95%' }}
                  />
                  <InputLabel sx={{ color: '#666666', fontWeight: 'bold' }}>Container Description</InputLabel>
                  <TextField
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., Plastic Waste Container"
                    sx={{ width: '95%' }}
                  />
                  <InputLabel sx={{ color: '#666666', fontWeight: 'bold' }}>Address</InputLabel>
                  <TextField
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    placeholder="e.g., 1234 Main St, City, Country"
                    sx={{ width: '95%' }}
                  />
                  <Box sx={{ marginTop: '20px' }}>
                    <FormControlLabel
                      control={<Switch checked={useMap} onChange={(e) => setUseMap(e.target.checked)} />}
                      label="Use map for geolocation"
                    />
                  </Box>
                  {useMap && (
                    <Box sx={{ marginTop: '20px' }}>
                      <MapContainer center={location} zoom={13} style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', width: '95%' }}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                      </MapContainer>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', gap: '20px', width: '95%', marginTop: '16px' }}>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel sx={{ color: '#666666', fontWeight: 'bold' }}>Height *</InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Select
                          value={dimensions.height}
                          onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#CCCCCC',
                              },
                              '&:hover fieldset': {
                                borderColor: '#48819A',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#48819A',
                              },
                            },
                          }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                        </Select>
                        <Typography sx={{ marginLeft: '8px', color: '#333333' }}>m</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel sx={{ color: '#666666', fontWeight: 'bold' }}>Length *</InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Select
                          value={dimensions.length}
                          onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#CCCCCC',
                              },
                              '&:hover fieldset': {
                                borderColor: '#48819A',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#48819A',
                              },
                            },
                          }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                        </Select>
                        <Typography sx={{ marginLeft: '8px', color: '#333333' }}>m</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel sx={{ color: '#666666', fontWeight: 'bold' }}>Width *</InputLabel>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Select
                          value={dimensions.width}
                          onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value)})}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#CCCCCC',
                              },
                              '&:hover fieldset': {
                                borderColor: '#48819A',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#48819A',
                              },
                            },
                          }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                        </Select>
                        <Typography sx={{ marginLeft: '8px', color: '#333333' }}>m</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={5}>
                <Box>
                  <Typography sx={{ marginBottom: '20px', fontFamily: 'Raleway', fontSize: '20px', fontWeight: 500, color: '#555555' }}>Additional Information</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px', border: '1px dashed #CCCCCC', borderRadius: '16px', marginBottom: '20px' }}>
                    <IconButton color="primary" component="label">
                      <input hidden accept="image/*" type="file" onChange={handlePhotoChange} />
                      <PhotoCamera />
                    </IconButton>
                    {photo && <Typography variant="body2" sx={{ marginLeft: '10px', color: '#555555' }}>{photo.name}</Typography>}
                  </Box>
                  <InputLabel sx={{ color: '#666666', fontWeight: 'bold' }}>Container Status</InputLabel>
                  <FormControl fullWidth margin="normal">
                    <Select
                      value={containerStatus}
                      onChange={(e) => setContainerStatus(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Unavailable">Unavailable</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography sx={{ marginTop: '20px', marginBottom: '8px', fontWeight: 500, color: '#666666' }}>Emptying Interval</Typography>
                  <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
                    <TextField
                      fullWidth
                      type="time"
                      value={emptyingStartTime}
                      onChange={(e) => setEmptyingStartTime(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      label="Start Time"
                      InputLabelProps={{ style: { color: '#666666', fontWeight: 'bold' } }}
                    />
                    <TextField
                      fullWidth
                      type="time"
                      value={emptyingEndTime}
                      onChange={(e) => setEmptyingEndTime(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      label="End Time"
                      InputLabelProps={{ style: { color: '#666666', fontWeight: 'bold' } }}
                    />
                  </Box>
                  <InputLabel sx={{ marginTop: '16px', color: '#666666', fontWeight: 'bold' }}>Exclude Days</InputLabel>
                  <FormControl fullWidth margin="normal">
                    <Select
                      multiple
                      value={excludeDays}
                      onChange={(e) => setExcludeDays(e.target.value as string[])}
                      variant="outlined"
                      placeholder="Choose days"
                    >
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                      <MenuItem value="Sunday">Sunday</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {/* Save Button */}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: '8px', padding: '16px', marginTop: '30px', fontSize: '18px', fontWeight: 'bold' }}
                >
                  Save Container
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditContainerForm;