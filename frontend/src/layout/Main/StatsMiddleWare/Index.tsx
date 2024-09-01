import React from "react";
import { Slide } from "@mui/material";
import { ContainerType } from "../../../pages/Main/constants";
import { VehicleType } from "../../../pages/Main/constants";
import Stats from "../Stats/Index";

interface StatsMiddlewareProps {
  renderStats: boolean;
  container: ContainerType[];
  containerLoading: boolean;
  containerError: any;
  vehicles: VehicleType[];
  vehiclesLoading: boolean;
  vehiclesError: any;
}

const StatsMiddleware: React.FC<StatsMiddlewareProps> = ({
  renderStats,
  container,
  containerLoading,
  containerError,
  vehicles,
  vehiclesLoading,
  vehiclesError,

}) => {
  return (
    <Slide in={renderStats} direction="right" mountOnEnter unmountOnExit>
      <div>
        <Stats
          containers={container}
          containerLoading={containerLoading}
          containerError={containerError}
          vehicles={vehicles}
          vehicleLoading={vehiclesLoading}
          vehicleError={vehiclesError}
        />
      </div>
    </Slide>
  );
};

export default StatsMiddleware;
