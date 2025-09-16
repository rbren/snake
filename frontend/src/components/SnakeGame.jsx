import { useState, useEffect, useCallback, useRef } from 'react'

const BOARD_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = { x: 0, y: -1 }
const GAME_SPEED = 150

const SnakeGame = () => {
  const canvasRef = useRef(null)
  const gameLoopRef = useRef(null)
  
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameState, setGameState] = useState('ready') // ready, playing, paused, gameOver
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  // Generate random food position
  const generateFood = useCallback(() => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [snake])

  // Check collision with walls or self
  const checkCollision = useCallback((head) => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y)
  }, [snake])

  // Move snake
  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }
      
      head.x += direction.x
      head.y += direction.y

      if (checkCollision(head)) {
        setGameState('gameOver')
        return currentSnake
      }

      newSnake.unshift(head)

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameState, checkCollision, generateFood])

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED)
    } else {
      clearInterval(gameLoopRef.current)
    }

    return () => clearInterval(gameLoopRef.current)
  }, [gameState, moveSnake])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'gameOver' || gameState === 'ready') {
        if (e.key === 'Enter' || e.key === ' ') {
          startGame()
        }
        return
      }

      if (e.key === ' ') {
        e.preventDefault()
        setGameState(prev => prev === 'playing' ? 'paused' : 'playing')
        return
      }

      // Arrow key controls
      const keyMap = {
        'ArrowUp': { x: 0, y: -1 },
        'ArrowDown': { x: 0, y: 1 },
        'ArrowLeft': { x: -1, y: 0 },
        'ArrowRight': { x: 1, y: 0 }
      }

      const newDirection = keyMap[e.key]
      if (newDirection) {
        e.preventDefault()
        // Prevent reverse direction
        setDirection(currentDirection => {
          if (newDirection.x === -currentDirection.x && newDirection.y === -currentDirection.y) {
            return currentDirection
          }
          return newDirection
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState])

  // Start/restart game
  const startGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection(INITIAL_DIRECTION)
    setScore(0)
    setGameState('playing')
  }

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('snakeHighScore', score.toString())
    }
  }, [score, highScore])

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
  }, [])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const cellSize = canvas.width / BOARD_SIZE

    // Clear canvas
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    ctx.fillStyle = '#4ade80'
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Snake head - slightly different color
        ctx.fillStyle = '#22c55e'
      } else {
        ctx.fillStyle = '#4ade80'
      }
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize - 1,
        cellSize - 1
      )
    })

    // Draw food
    ctx.fillStyle = '#ef4444'
    ctx.fillRect(
      food.x * cellSize,
      food.y * cellSize,
      cellSize - 1,
      cellSize - 1
    )

    // Draw grid lines
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1
    for (let i = 0; i <= BOARD_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * cellSize, 0)
      ctx.lineTo(i * cellSize, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * cellSize)
      ctx.lineTo(canvas.width, i * cellSize)
      ctx.stroke()
    }
  }, [snake, food])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-center mb-2">Snake Game</h1>
        <div className="flex justify-center space-x-8 text-lg">
          <div>Score: <span className="font-bold text-green-400">{score}</span></div>
          <div>High Score: <span className="font-bold text-yellow-400">{highScore}</span></div>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-gray-600 bg-gray-800"
        />
        
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="text-center">
              {gameState === 'ready' && (
                <>
                  <h2 className="text-2xl mb-4">Ready to Play?</h2>
                  <p className="mb-2">Use arrow keys to move</p>
                  <p className="mb-4">Press SPACE to pause</p>
                  <p className="text-green-400">Press ENTER or SPACE to start</p>
                </>
              )}
              {gameState === 'paused' && (
                <>
                  <h2 className="text-2xl mb-4">Game Paused</h2>
                  <p className="text-green-400">Press SPACE to continue</p>
                </>
              )}
              {gameState === 'gameOver' && (
                <>
                  <h2 className="text-2xl mb-4 text-red-400">Game Over!</h2>
                  <p className="mb-2">Final Score: {score}</p>
                  {score === highScore && score > 0 && (
                    <p className="mb-4 text-yellow-400">New High Score! 🎉</p>
                  )}
                  <p className="text-green-400">Press ENTER or SPACE to play again</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>Use arrow keys to move • SPACE to pause • ENTER to restart</p>
      </div>
    </div>
  )
}

export default SnakeGame