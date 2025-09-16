


export const handleKeyDown = (e, direction, setDirection) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction[1] !== 1) {
        setDirection([0, -1]);
      }
      break;
    case 'ArrowDown':
      if (direction[1] !== -1) {
        setDirection([0, 1]);
      }
      break;
    case 'ArrowLeft':
      if (direction[0] !== 1) {
        setDirection([-1, 0]);
      }
      break;
    case 'ArrowRight':
      if (direction[0] !== -1) {
        setDirection([1, 0]);
      }
      break;
  }
};


