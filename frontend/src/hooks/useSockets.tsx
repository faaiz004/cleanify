import { useState, useEffect, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

interface UseSocketProps {
  socketUrl: string;
  user_id: string;
}

interface NewLocation {
  vehicle_id: string;
  location: string;
}

const useSocket = ({ socketUrl, user_id }: UseSocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newLocationQueue, setNewLocationQueue] = useState<NewLocation[]>([]);
  const [readyState, setReadyState] = useState<number>(3); // 3 = CLOSED

  // Ref to manage the queue without triggering re-renders
  const queueRef = useRef<NewLocation[]>([]);
  // Ref to prevent concurrent processing
  const processingRef = useRef(false);

  useEffect(() => {
    const newSocket = io(socketUrl, {
      query: { user_id },
    });

    setSocket(newSocket);

    newSocket.on('connected', (data) => {
      console.log('Server-assigned SID:', data.sid);
      console.log('Client Socket ID:', newSocket.id);
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
      // Update the ref-based queue
      queueRef.current.push(data);
      // Trigger processing of the queue
      processQueue();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [socketUrl, user_id]);

  // Function to process the queue without skipping updates
  const processQueue = useCallback(() => {
    if (processingRef.current) return; // Exit if already processing

    processingRef.current = true; // Set processing flag

    // Process all items in the queue
    while (queueRef.current.length > 0) {
      const nextLocation = queueRef.current.shift()!;
      setNewLocationQueue((prevQueue) => [...prevQueue, nextLocation]);
    }

    processingRef.current = false; // Reset processing flag
  }, []);

  // Function to dequeue an item and update both the ref and state
  const dequeueLocation = useCallback(() => {
    setNewLocationQueue((prevQueue) => {
      // Just return the updated state without modifying queueRef again
      return prevQueue.slice(1); // This reflects the current state after an item has been removed by processQueue
    });
  }, []);

  const sendMessage = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return {
    sendMessage,
    newLocationQueue,
    dequeueLocation,
    readyState,
  };
};

export default useSocket;
