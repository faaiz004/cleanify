import React, { useRef, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ContainerType } from "../../../pages/Main/constants";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { stringToNumberTuple } from "../../../components/Select/Index";
import Status from "../../../components/Status/Index";
import CreateCustomIcon from "./CreateCustomIcon/Index";
import FlyToAPos from "./FlyToAPos/Index";
import { VehicleType } from "../../../pages/Main/constants";
import createClusterCustomIcon from "./createCustomIconCluser/Index";

// Define the color mappings
const colorMap: {
  [key in "OVERFLOWING" | "FULL" | "NORMAL" | "EMPTY"]: string;
} = {
  OVERFLOWING: "rgba(255, 99, 132, 0.8)",
  FULL: "rgba(255, 206, 86, 0.8)",
  NORMAL: "rgba(75, 192, 192, 0.8)",
  EMPTY: "rgba(54, 162, 235, 0.8)",
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

const Map: React.FC<{
  toggleStats: () => void;
  showStats: boolean;
  containers: ContainerType[];
  containerError: any;
  vehicles: VehicleType[];
  vehicleError: any;
}> = ({ toggleStats, showStats, containers, containerError, vehicles, vehicleError }) => {
  // console.log('container error in map', containerError);

  const mapRef = useRef(null);
  const currentLocation = useSelector(
    (state: RootState) => state.location.currentLocation
  );
  const markers = useMemo(() => {
    return containers?.length > 0
      ? containers?.map((container) => ({
          geocode: stringToNumberTuple(container.location) as [number, number],
          popUp: `${container.fill_status}`,
          icon: CreateCustomIcon(colorMap[container.fill_status], [42,42], true),
        }))
      : [];
  }, [containers]);



  // const [vehicles, setVehicles] = React.useState<Vehicle[]>(initialVehicles);

  const vehicleMarkers = useMemo(() => {
    return vehicles.map((vehicle) => ({
      position: stringToNumberTuple(vehicle.location) as [number, number],
      id: vehicle.id,
      icon: CreateCustomIcon("rgba(173, 216, 230, 0.8)", [42,42],false), // Yellow for vehicles
    }));
  }, [vehicles]);


  return (
    <MapContainer
      center={
        (currentLocation.Position as [number, number]) || [31.5497, 74.3436]
      }
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
      {/* Marker Cluster Group for Containers and Vehicles */}
      <MarkerClusterGroup
        iconCreateFunction = {createClusterCustomIcon}
      >
        {markers?.length > 0 &&
          markers?.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={marker.icon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}

        {vehicleMarkers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={marker.icon}>
            <Popup>{marker.id}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* Toggle button here */}
      <ToggleEditButton showEdits={showStats} toggleEdit={toggleStats} />
      {/* Status component */}
      <Status containerError={containerError} vehiclesError={vehicleError} />
      {/* Fly to a location */}
      <FlyToAPos />
    </MapContainer>
  );
};

export default Map;
