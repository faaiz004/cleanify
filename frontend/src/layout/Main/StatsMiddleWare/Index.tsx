import React from 'react';
import { Slide } from '@mui/material';
import { ContainerType } from '../../../pages/Main/constants';
import Stats from '../Stats/Index';

interface StatsMiddlewareProps {
  renderStats: boolean;
  container: ContainerType[];
}

const StatsMiddleware: React.FC<StatsMiddlewareProps> = ({ renderStats, container }) => {
  return (
    <Slide 
      in={renderStats} 
      direction="right" 
      mountOnEnter 
      unmountOnExit
    >
      <div>
        <Stats containers = {container} />
      </div>
    </Slide>
  );
};

export default StatsMiddleware;
