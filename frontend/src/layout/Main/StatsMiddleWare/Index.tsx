import React from 'react';
import { Slide } from '@mui/material';
import { ContainerType } from '../../../pages/Main/constants';
import Stats from '../Stats/Index';

interface StatsMiddlewareProps {
  renderStats: boolean;
  container: ContainerType[];
  containerLoading: boolean;
  containerError: any;
}

const StatsMiddleware: React.FC<StatsMiddlewareProps> = ({ renderStats, container,containerLoading,containerError }) => {
  return (
    <Slide 
      in={renderStats} 
      direction="right" 
      mountOnEnter 
      unmountOnExit
    >
      <div>
        <Stats containers = {container} containerLoading = {containerLoading} containerError = {containerError} />
      </div>
    </Slide>
  );
};

export default StatsMiddleware;
