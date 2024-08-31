import * as React from 'react';
import Box from '@mui/material/Box';
import { root } from './Styles';
import Map from '../../layout/Main/Map/Index';
import StatsMiddleware from '../../layout/Main/StatsMiddleWare/Index';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from '@tanstack/react-query';
import { getContainers } from '../../services/Container/Index';
import useSocket from '../../hooks/useSockets';

export interface LocationObj {
  center: string;
  id: string;
  name: string;
  radius: Number;
}


export default function MainBody() {

  const socketUrl = 'http://127.0.0.1:5000';
  const user_id = useSelector((state:RootState) => state.user.access_token);
  const {lastMessage} = useSocket({socketUrl, user_id});

  React.useEffect(() => {
    console.log('Last message:', lastMessage);
  }, [lastMessage]);



  const [showStats, setShowStats] = React.useState<boolean>(true);

  const toggleStats = () => {
    setShowStats((prevShowStats:boolean) => !prevShowStats);
  };


  // Get the current location from the store
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);


  // Query for fetching containers
  const { data: container = [], isLoading: containerLoading, error: containerError } = useQuery({
    queryKey: ['containers',currentLocation],
    queryFn: () => getContainers(currentLocation.id),
    enabled: !!currentLocation,
  });


  return (
        <Box sx = {root}>
          <StatsMiddleware renderStats = {showStats}  container = {container} containerLoading = {containerLoading} containerError = {containerError} />
          <Map toggleStats={toggleStats} showStats = {showStats} containers={container}  containerError={containerError} />
        </Box>
  );
}