




import { useState, useEffect } from 'react';
import { isGameOver, moveSnake } from './gameUtils';

const useSnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameOver(snake, direction, 20, 20)) {
        setGameOver(true);
      } else {
        const newSnake = moveSnake(snake, direction, food, setFood, setScore);
        setSnake(newSnake);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [direction, snake, food]);

  return {
    snake,
    food,
    direction,
    setDirection,
    gameOver,
    score,
  };
};

export default useSnakeGame;




