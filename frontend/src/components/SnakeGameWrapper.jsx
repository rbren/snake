

import React, { useState } from 'react';
import SnakeGame from './SnakeGame';
import { handleKeyDown } from './gameControls';

const SnakeGameWrapper = () => {
  const [direction, setDirection] = useState([0, -1]);

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e, direction, setDirection)}
      style={{
        width: '400px',
        height: '400px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      <SnakeGame direction={direction} />
    </div>
  );
};

export default SnakeGameWrapper;

