import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocationObj } from "../../pages/Main/Index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setLocation, setDefault } from "../../redux/locationSlice";


export const stringToNumberTuple = (str: string): [number, number] => {
  // Remove parentheses from the string
  const cleanedStr = str.replace(/^\(|\)$/g, "").trim();

  // Split the cleaned string by comma and trim any extra whitespace
  const [latStr, longStr] = cleanedStr.split(",").map((part) => part.trim());

  // Parse the numbers from the cleaned strings
  const lat = parseFloat(latStr);
  const long = parseFloat(longStr);

  // Check for invalid numbers and handle as needed
  if (isNaN(lat) || isNaN(long)) {
    throw new Error(
      "Invalid input: both latitude and longitude must be valid numbers."
    );
  }

  return [lat, long];
};

export default function SelectVariants({
  options,
}: {
  options: LocationObj[];
}) {
  const dispatch = useDispatch();
  const currentLocation = useSelector(
    (state: RootState) => state.location.currentLocation
  );

  const handleChange = (event: any) => {
    const selectedCity = event.target.value as string;
    if(selectedCity === "All Locations"){
      dispatch(setDefault());
      return;
    }
    const selectedLocation = options.find(
      (option) => option.name === selectedCity
    );

    try {
      const newPostion = stringToNumberTuple(
        selectedLocation?.center || "31.5497,74.3436"
      );
      const newCurrentLocation: {
        id: string;
        Position: [number, number];
        Name: string;
      } = {
        id: selectedLocation?.id || "",
        Position: newPostion || [31.5497, 74.3436],
        Name: selectedLocation?.name || "Default Location",
      };

      if (selectedLocation) {
        dispatch(setLocation({ currentLocation: newCurrentLocation }));
      }
    } catch (error) {
      alert("Invalid input: both latitude and longitude must be valid numbers.");
      dispatch(setDefault()); 
    }
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currentLocation.Name == "Default Location" ? "All Locations" : currentLocation.Name}
          onChange={handleChange}
          label="Location"
          sx={{
            color: "white", // Text color
            "& .MuiSelect-icon": {
              color: "white", // Dropdown icon color
            },
            "&::before": {
              borderBottom: "1px solid white", // Underline color before focus
            },
            "&::after": {
              borderBottom: "2px solid white", // Underline color after focus
            },
            "&:hover:not(.Mui-disabled)::before": {
              borderBottom: "2px solid white", // Underline color on hover
            },
          }}
        >
          {/* <MenuItem value="Lahore">Lahore</MenuItem>
          <MenuItem value="Islamabad">Islamabad</MenuItem> */}
          
            <MenuItem value="All Locations">All Locations</MenuItem>
            { options.length > 0 && options.map((option: LocationObj, index: number) => {
              return (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              );
            })}
          

        </Select>
      </FormControl>
    </div>
  );
}
