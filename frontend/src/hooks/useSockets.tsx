import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface UseSocketProps {
  socketUrl: string;
  user_id: string;
}

const useSocket = ({ socketUrl, user_id }: UseSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [readyState, setReadyState] = useState<number>(3); // 3 = CLOSED

  useEffect(() => {
    // Initialize the Socket.IO connection
    const newSocket = io(socketUrl, {
      query: { user_id },
    });

    setSocket(newSocket);

    // Handle socket events
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
      setReadyState(1); // 1 = OPEN
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setReadyState(3); // 3 = CLOSED
    });

    newSocket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setReadyState(2); // 2 = CLOSING
    });

    newSocket.on('location-pinged', (data) => {
      console.log('Location pinged:', data);
      setLastMessage(data);
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl, user_id]);

  const sendMessage = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return {
    sendMessage,
    lastMessage,
    readyState,
  };
};

export default useSocket;