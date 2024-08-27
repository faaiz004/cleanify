import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocationObj } from '../../pages/Main/Index';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setLocation } from '../../redux/locationSlice';

export default function SelectVariants({
    options,
}: {
    options: LocationObj[];
}) {
    const dispatch = useDispatch();
    const currentLocation = useSelector((state:RootState) => state.location.currentLocation);


    const handleChange = (event:any) => {
        const selectedCity = event.target.value as string;
        const selectedLocation = options.find((option) => option.City === selectedCity);

        const newCurrentLocation = {
          Position: selectedLocation?.Position || [31.5497, 74.3436],
          Name: selectedLocation?.City || 'Lahore',
        };
    
        if (selectedLocation) {
          dispatch(setLocation({currentLocation: newCurrentLocation}));
        }
      };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currentLocation.Name}
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