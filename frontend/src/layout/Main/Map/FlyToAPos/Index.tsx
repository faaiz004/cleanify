import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

const FlyToAPos: React.FC = () => {
    const map = useMap();
    const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
    useEffect(() => {
      if (map && currentLocation) {
        map.flyTo(currentLocation.Position as [number, number], 13); // Adjust zoom level as needed
      }
    }, [currentLocation, map]);
  
    return null; // No need to render anything
};

export default FlyToAPos;