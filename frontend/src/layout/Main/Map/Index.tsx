import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapIcon from '../../../assets/map.png';

interface MarkerData {
  geocode: LatLngExpression;
  popUp: string;
}

const markers: MarkerData[] = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Hello, I am pop up 1"
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Hello, I am pop up 2"
  },
  {
    geocode: [48.855, 2.3522],
    popUp: "Hello, I am pop up 3"
  }
];

const customIcon = new Icon({
  iconUrl: mapIcon, // Use the imported image
  iconSize: [38, 38]
});

const ScrollToLocationButton: React.FC = () => {
  const map = useMap();

  const handleClick = () => {
    const lahoreLocation: LatLngExpression = [31.5497, 74.3436]; // Coordinates for Lahore
    map.flyTo(lahoreLocation, 13, {
      duration: 2 // Duration in seconds for the animation
    });
  };

  return (
    <button 
      onClick={handleClick} 
      style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
      Fly to Lahore
    </button>
  );
}

const Map: React.FC = () => {
  return (
      <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: '87vh', width: '100%', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.geocode} icon={customIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}
      <ScrollToLocationButton />
    </MapContainer>

  );
}

export default Map;
