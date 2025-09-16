





import React from 'react';
import useSnakeGame from './useSnakeGame';
import SnakeGameView from './SnakeGameView';

const SnakeGameApp = () => {
  const { snake, food, direction, setDirection, gameOver, score } = useSnakeGame();

  return (
    <SnakeGameView
      snake={snake}
      food={food}
      direction={direction}
      setDirection={setDirection}
      gameOver={gameOver}
      score={score}
    />
  );
};

export default SnakeGameApp;





