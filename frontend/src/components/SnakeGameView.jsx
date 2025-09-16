




import React from 'react';
import SnakeGame from './SnakeGame';
import ScoreDisplay from './ScoreDisplay';
import GameOverScreen from './GameOverScreen';

const SnakeGameView = ({ snake, food, direction, setDirection, gameOver, score }) => {
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
      <ScoreDisplay score={score} />
      {gameOver && <GameOverScreen score={score} />}
    </div>
  );
};

export default SnakeGameView;




