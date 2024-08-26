import React from 'react';
import { Slide } from '@mui/material';
import { ContainerType } from '../../../pages/Main/constants';
import Stats from '../Stats/Index';

interface StatsMiddlewareProps {
  renderStats: boolean;
  container: ContainerType[];
  currentCity: string;
}

const StatsMiddleware: React.FC<StatsMiddlewareProps> = ({ renderStats, container, currentCity }) => {
  return (
    <Slide 
      in={renderStats} 
      direction="right" 
      mountOnEnter 
      unmountOnExit
    >
      <div>
        <Stats containers = {container} currentCity={currentCity} />
      </div>
    </Slide>
  );
};

export default StatsMiddleware;
