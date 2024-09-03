import * as React from "react";
import Box from "@mui/material/Box";
import { root } from "./Styles";
import Map from "../../layout/Main/Map/Index";
import StatsMiddleware from "../../layout/Main/StatsMiddleWare/Index";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQuery } from "@tanstack/react-query";
import { getContainers } from "../../services/Container/Index";
import useSocket from "../../hooks/useSockets";
import { VehicleType } from "../../pages/Main/constants";
import { getVehicles } from "../../services/Vehicle/Index";

export interface LocationObj {
  center: string;
  id: string;
  name: string;
  radius: Number;
}

export default function MainBody() {
  const socketUrl = "http://127.0.0.1:5000";
  const user_id = useSelector((state: RootState) => state?.user?.access_token);
  console.log("User ID in MainBody:", user_id);
  const { newLocationQueue, dequeueLocation } = useSocket({ socketUrl, user_id });

  React.useEffect(() => {
    console.log("New Location Queue:", newLocationQueue);
  }, [newLocationQueue]);

  const [showStats, setShowStats] = React.useState<boolean>(true);

  const toggleStats = () => {
    setShowStats((prevShowStats: boolean) => !prevShowStats);
  };

  // Get the current location from the store
  const currentLocation = useSelector(
    (state: RootState) => state.location.currentLocation
  );

  // Query for fetching containers
  const {
    data: container = [],
    isLoading: containerLoading,
    error: containerError,
  } = useQuery({
    queryKey: ["containers", currentLocation],
    queryFn: () => getContainers(currentLocation.id),
    enabled: !!currentLocation,
  });

  console.log("Container Error in MainBody:", containerError);

  // Query for fetching vehicles
  // use react-query to fetch the data
  const {
    data: vehicleApiData = [],
    isLoading: vehicleLoading,
    error: vehicleError,
  } = useQuery<VehicleType[]>({
    queryKey: ["vehicles", currentLocation],
    queryFn: () => getVehicles(user_id, currentLocation.id),
    enabled: !!currentLocation,
  });

  const [vehicle, setVehicle] = React.useState<VehicleType[]>(vehicleApiData || []);

  // Update the vehicle state when the data changes
  React.useEffect(() => {
    if(!vehicleError || !vehicleLoading){
      setVehicle(vehicleApiData || []);
    }
  }, [vehicleApiData]);

  // update the vehicle state when new location is received from the socket
  React.useEffect(() => {
    if (newLocationQueue.length > 0) {
      const newLocation = newLocationQueue[0]; // Peek at the first item in the queue
      setVehicle((prevVehicle) => {
        const newVehicle = prevVehicle.map((vehicle: VehicleType) => {
          if (vehicle.id === newLocation.vehicle_id) {
            return {
              ...vehicle,
              location: newLocation.location,
            };
          }
          return vehicle;
        });
        return newVehicle;
      });
      dequeueLocation(); // Remove the first item from the queue
    }
  }, [newLocationQueue]);

  React.useEffect(() => {
    console.log("Vehicle in Main Body:", vehicle);
  }, [vehicle]);

  
  
  return (
    <Box sx={root}>
      <StatsMiddleware
        renderStats={showStats}
        container={container}
        containerLoading={containerLoading}
        containerError={containerError}
        vehicles={vehicle}
        vehiclesLoading={vehicleLoading}
        vehiclesError={vehicleError}
      />
      <Map
        toggleStats={toggleStats}
        showStats={showStats}
        containers={container}
        containerError={containerError}
        vehicles={vehicle}
        vehicleError={vehicleError}
      />
    </Box>
  );
}
