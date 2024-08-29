import React, { useRef, useMemo, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ContainerType } from "../../../pages/Main/constants";
import MarkerClusterGroup from 'react-leaflet-cluster'
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { stringToNumberTuple } from "../../../components/Select/Index";
import { Vehicle, initialVehicles } from "./constants";
import Status from "../../../components/Status/Index";
import CreateCustomIcon from "./CreateCustomIcon/Index";
import FlyToAPos from "./FlyToAPos/Index";




// Define the color mappings
const colorMap: { [key in 'OVERFLOWING' | 'FULL' | 'NORMAL' | 'EMPTY' ]: string } = {
  OVERFLOWING: "red",
  FULL: "orange",
  NORMAL: "green",
  EMPTY: "blue",
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
      {showEdits ? "Hide Stats" : "Show Stats"}
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


const Map: React.FC<{ toggleStats: () => void; showStats: boolean, containers: ContainerType[], containerError: any }> = ({
  toggleStats,
  showStats,
  containers,
  containerError,
}) => {

  console.log('container error in map', containerError);


  const mapRef = useRef(null);
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const markers = useMemo(() => {
    return containers?.length > 0 ? 
    containers?.map((container) => ({
      geocode: stringToNumberTuple(container.location) as [number, number],
      popUp: `${container.fill_status}`,
      icon: CreateCustomIcon(colorMap[container.fill_status]),
    })): 
    [];
  }, [containers]);

  const [vehicles, setVehicles] = React.useState<Vehicle[]>(initialVehicles);

  const vehicleMarkers = useMemo(() => {
    return vehicles.map((vehicle) => ({
      position: vehicle.position,
      id: vehicle.id,
      icon: CreateCustomIcon("yellow"), // Yellow for vehicles
    }));
  }, [vehicles]);

  // Function to update vehicle positions
  const updateVehiclePositions = (newPositions: Vehicle[]) => {
    setVehicles(newPositions);
  };

  // Simulate vehicle position updates (Replace with your real-time data fetching logic)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newVehiclePositions: Vehicle[] = vehicles.map((vehicle) => ({
        ...vehicle,
        position: [
          vehicle.position[0] + (Math.random() - 0.5) * 0.01, // Randomize position slightly
          vehicle.position[1] + (Math.random() - 0.5) * 0.01,
        ],
      }));
      updateVehiclePositions(newVehiclePositions);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId);
  }, [vehicles]);

  return (
    <MapContainer
      center={currentLocation.Position as [number, number] || [31.5497, 74.3436]}
      zoom={13}
      style={{ height: "100%", width: "100%", zIndex: 0, position: "relative" }}
      ref={mapRef}
      id="map-container"
      whenReady={() => resizeMap(mapRef)}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marker Cluster Group for Containers */}
      <MarkerClusterGroup>
        {markers?.length > 0 && markers?.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={marker.icon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Marker Cluster Group for Vehicles */}
      <MarkerClusterGroup>
        {vehicleMarkers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={marker.icon}>
            <Popup>{marker.id}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Toggle button here */}
      <ToggleEditButton showEdits={showStats} toggleEdit={toggleStats} />
      {/* Status component */}
      <Status  error={containerError} />
      {/* Fly to a location */}
      <FlyToAPos/>
    </MapContainer>
  );
};

export default Map;