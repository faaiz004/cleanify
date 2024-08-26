import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocationObj } from '../../pages/Main/Index';

export default function SelectVariants({
    location,
    setLocation,
    options,
}: {
    location: string;
    setLocation: any
    options: LocationObj[];
}) {

    const handleChange = (event:any) => {
        const selectedCity = event.target.value as string;
        const selectedLocation = options.find((option) => option.City === selectedCity);
    
        if (selectedLocation) {
          setLocation(selectedLocation);
        }
      };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={location}
          onChange={handleChange}
          label="Location"
          sx={{
            color: 'white', // Text color
            '& .MuiSelect-icon': {
              color: 'white', // Dropdown icon color
            },
            '&::before': {
              borderBottom: '1px solid white', // Underline color before focus
            },
            '&::after': {
              borderBottom: '2px solid white', // Underline color after focus
            },
            '&:hover:not(.Mui-disabled)::before': {
              borderBottom: '2px solid white', // Underline color on hover
            },
          }}
        >
          {/* <MenuItem value="Lahore">Lahore</MenuItem>
          <MenuItem value="Islamabad">Islamabad</MenuItem> */}
          {
            options.map((option:LocationObj) => {
                return (
                    <MenuItem key = {option.City} value = {option.City}>{option.City}</MenuItem>
                )
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}