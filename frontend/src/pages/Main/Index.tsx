import * as React from 'react';
import Box from '@mui/material/Box';
import { root } from './Styles';
import Map from '../../layout/Main/Map/Index';
import StatsMiddleware from '../../layout/Main/StatsMiddleWare/Index';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from '@tanstack/react-query';
import { getContainers } from '../../services/Container/Index';

export interface LocationObj {
  center: string;
  id: string;
  name: string;
  radius: Number;
}


export default function MainBody() {

  const [showStats, setShowStats] = React.useState<boolean>(true);

  const toggleStats = () => {
    setShowStats((prevShowStats:boolean) => !prevShowStats);
  };


  // Get the current location from the store
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);


   // simulating an API call to get the containers
  const fetchContainers = async (): Promise<any> => {
    try {
      const containers = await getContainers(currentLocation.id);
      return containers.data;
    } catch (error) {
      console.log("error in fetchContainers", error);
      throw error;
    }
  }


  // Query for fetching containers
  const { data: container = [], isLoading: containerLoading, error: containerError } = useQuery({
    queryKey: ['containers',currentLocation],
    queryFn: () => fetchContainers(),
    enabled: !!currentLocation,
  });


  return (
        <Box sx = {root}>
          <StatsMiddleware renderStats = {showStats}  container = {container} containerLoading = {containerLoading} containerError = {containerError} />
          <Map toggleStats={toggleStats} showStats = {showStats} containers={container}  containerError={containerError} />
        </Box>
  );
}