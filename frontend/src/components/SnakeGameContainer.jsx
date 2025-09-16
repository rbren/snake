



import React from 'react';
import useSnakeGame from './useSnakeGame';
import SnakeGame from './SnakeGame';
import GameOverScreen from './GameOverScreen';

const SnakeGameContainer = () => {
  const { snake, food, direction, setDirection, gameOver, score } = useSnakeGame();

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
      <SnakeGame
        snake={snake}
        food={food}
        direction={direction}
        setDirection={setDirection}
      />
      {gameOver && <GameOverScreen score={score} />}
    </div>
  );
};

export default SnakeGameContainer;



