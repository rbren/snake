



import React from 'react';
import SnakeGame from './SnakeGame';
import ScoreDisplay from './ScoreDisplay';
import GameOverScreen from './GameOverScreen';
import './SnakeGameStyles.css';

const SnakeGameLayout = ({ snake, food, direction, setDirection, gameOver, score }) => {
  return (
    <div className="snake-game-container">
      <div className="game-area">
        <SnakeGame
          snake={snake}
          food={food}
          direction={direction}
          setDirection={setDirection}
        />
      </div>
      <div className="score-display">
        <ScoreDisplay score={score} />
      </div>
      {gameOver && <div className="game-over-screen">
        <GameOverScreen score={score} />
      </div>}
    </div>
  );
};

export default SnakeGameLayout;



