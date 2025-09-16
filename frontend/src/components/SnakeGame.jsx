
import React, { useState, useEffect } from 'react';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, -1]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, 100);

    return () => clearInterval(interval);
  }, [direction]);

  const moveSnake = () => {
    const newHead = [
      snake[0][0] + direction[0],
      snake[0][1] + direction[1],
    ];

    if (
      newHead[0] < 0 ||
      newHead[0] >= 20 ||
      newHead[1] < 0 ||
      newHead[1] >= 20 ||
      snake.some((segment) => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      setGameOver(true);
      return;
    }

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
      setScore(score + 1);
    } else {
      snake.pop();
    }

    setSnake([newHead, ...snake]);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection([0, -1]);
        break;
      case 'ArrowDown':
        setDirection([0, 1]);
        break;
      case 'ArrowLeft':
        setDirection([-1, 0]);
        break;
      case 'ArrowRight':
        setDirection([1, 0]);
        break;
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        width: '400px',
        height: '400px',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      {snake.map((segment, index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'green',
            position: 'absolute',
            left: `${segment[0] * 20}px`,
            top: `${segment[1] * 20}px`,
          }}
        />
      ))}
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: 'red',
          position: 'absolute',
          left: `${food[0] * 20}px`,
          top: `${food[1] * 20}px`,
        }}
      />
      {gameOver && (
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
      )}
    </div>
  );
};

export default SnakeGame;
