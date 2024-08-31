import * as React from 'react';
import Box from '@mui/material/Box';
import { root } from './Styles';
import Map from '../../layout/Main/Map/Index';
import StatsMiddleware from '../../layout/Main/StatsMiddleWare/Index';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from '@tanstack/react-query';
import { getContainers } from '../../services/Container/Index';
import { useState } from 'react';
import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

export interface LocationObj {
  center: string;
  id: string;
  name: string;
  radius: Number;
}


export default function MainBody() {

  const socketUrl = 'http://127.0.0.1:5000';
  const user_id = useSelector((state:RootState) => state.user.access_token);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [readyState, setReadyState] = useState<number>(3); // 3 = CLOSED

  useEffect(() => {
    // Initialize the socket connection with user_id as a query parameter
    const newSocket = io(socketUrl, {
      path: '/socket.io/',  // This is the path where your Flask-SocketIO server listens
      // transports: ['websocket'],  // Ensure WebSocket is used
      query: {
        user_id, // Send user_id as part of the connection query
      },
    });

    // Store the socket instance
    setSocket(newSocket);

    // Handle connection
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
      setReadyState(newSocket.connected ? 1 : 0); // 1 = OPEN, 0 = CONNECTING
    });

    // Handle incoming messages
    newSocket.on('location-pinged', (data) => {
      console.log('Location pinged:', data);
      setLastMessage(data);
    });

    // Handle disconnection
    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setReadyState(3); // 3 = CLOSED
    });

    // Handle connection error
    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setReadyState(2); // 2 = CLOSING
    });

    // // Clean up on component unmount
    // return () => {
    //   newSocket.disconnect();
    // };
  }, [socketUrl, user_id]);



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