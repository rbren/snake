import '@testing-library/jest-dom'

// Mock Canvas API for tests
class MockCanvasRenderingContext2D {
  fillStyle = ''
  strokeStyle = ''
  lineWidth = 1
  
  fillRect() {}
  strokeRect() {}
  beginPath() {}
  moveTo() {}
  lineTo() {}
  stroke() {}
  fill() {}
}

// Mock HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = function(contextType) {
  if (contextType === '2d') {
    return new MockCanvasRenderingContext2D()
  }
  return null
}

// Mock canvas dimensions
Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
  get: function() { return 400 },
  set: function() {}
})

Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
  get: function() { return 400 },
  set: function() {}
})