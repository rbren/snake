




export const isGameOver = (snake, direction, width, height) => {
  const newHead = [
    snake[0][0] + direction[0],
    snake[0][1] + direction[1],
  ];

  return (
    newHead[0] < 0 ||
    newHead[0] >= width ||
    newHead[1] < 0 ||
    newHead[1] >= height ||
    snake.some((segment, index) => (index > 0 && segment[0] === newHead[0] && segment[1] === newHead[1]))
  );
};

export const moveSnake = (snake, direction, food, setFood, setScore) => {
  const newHead = [
    snake[0][0] + direction[0],
    snake[0][1] + direction[1],
  ];

  if (newHead[0] === food[0] && newHead[1] === food[1]) {
    setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    setScore(score => score + 1);
    return [[...newHead], ...snake];
  } else {
    const newSnake = [[...newHead], ...snake.slice(0, -1)];
    return newSnake;
  }
};




