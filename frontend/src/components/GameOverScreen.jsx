


import React from 'react';

const GameOverScreen = ({ score }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
    >
      Game Over! Your score: {score}
    </div>
  );
};

export default GameOverScreen;


