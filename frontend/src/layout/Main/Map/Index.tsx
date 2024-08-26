import React, { useRef, useMemo, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon, PointExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { ContainerType } from "../../../pages/Main/constants";
import { LocationObj } from "../../../pages/Main/Index";
import MarkerClusterGroup from 'react-leaflet-cluster'

// Function to create a custom icon with a specific color
const createCustomIcon = (color: string, size: PointExpression = [38, 38]) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="${color}">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    `)}`,
    iconSize: size,
    iconAnchor: [19, 38], // Adjusted to make the circle center aligned
  });
};

// Define the color mappings
const colorMap: { [key in any]: string } = {
  Overflowing: "red",
  Full: "orange",
  Normal: "green",
  Empty: "blue",
};

const ToggleEditButton: React.FC<{
  toggleEdit: () => void;
  showEdits: boolean;
}> = ({ toggleEdit, showEdits }) => {
  return (
    <button
      onClick={toggleEdit}
      style={{
        position: "absolute",
        top: "80px",
        left: "10px",
        zIndex: 1000,
        padding: "8px 12px",
        backgroundColor: showEdits ? "#d32f2f" : "#3f51b5",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        transition: "background-color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = showEdits
          ? "#c62828"
          : "#303f9f";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = showEdits
          ? "#d32f2f"
          : "#3f51b5";
      }}
    >
      {showEdits ? "Disable Edits" : "Enable Edits"}
    </button>
  );
};

const resizeMap = (mapRef: any) => {
  const resizeObserver = new ResizeObserver(() =>
    mapRef.current?.invalidateSize()
  );
  const container = document.getElementById("map-container");
  if (container) {
    resizeObserver.observe(container);
  }
};

interface FlyToAPosProps {
  currentLocation: LocationObj;
}

const FlyToAPos: React.FC<FlyToAPosProps> = ({ currentLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (map && currentLocation) {
      map.flyTo(currentLocation.Position as [number, number], 13); // Adjust zoom level as needed
    }
  }, [currentLocation, map]);

  return null; // No need to render anything
};

const Map: React.FC<{ toggleStats: () => void; showStats: boolean, containers: ContainerType[], currentLocation: LocationObj }> = ({
  toggleStats,
  showStats,
  containers,
  currentLocation
}) => {
  const mapRef = useRef(null);

  const markers = useMemo(() => {
    return containers.map((container) => ({
      geocode: [container.location.coordinates.lat, container.location.coordinates.lon] as [number, number],
      popUp: `${container.status} at ${container.location.name}`,
      icon: createCustomIcon(colorMap[container.status]),
    }));
  }, [containers]);

  return (
    <MapContainer
      center={[31.5497, 74.3436]}
      zoom={13}
      style={{ height: "87vh", width: "100%", zIndex: 0 }}
      ref={mapRef}
      id="map-container"
      whenReady={() => resizeMap(mapRef)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={marker.icon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Toggle button here */}
      <ToggleEditButton showEdits={showStats} toggleEdit={toggleStats} />
      <FlyToAPos currentLocation={currentLocation} />
    </MapContainer>
  );
};

export default Map;