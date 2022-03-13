const withGrid = (n) => n * 16

const asGridCoord = (x, y) => `${withGrid(x)},${withGrid(y)}`

// can only do straight lines
const drawWallLineCoord = (firstCoord, secondCoord) => {
  const [firstX, firstY] = firstCoord
  const [secondX, secondY] = secondCoord
  const walls = {}

  if (firstX === secondX) {
    // vertical
    const offsetY = firstY - secondY
    for (let i = 0; i < Math.abs(offsetY); i += 1) {
      const y = offsetY > 0 ? firstY - i : firstY + i
      walls[`${withGrid(firstX)},${withGrid(y)}`] = true
    }
  } else if (firstY === secondY) {
    // horizontal
    const offsetX = firstX - secondX
    for (let i = 0; i < Math.abs(offsetX); i += 1) {
      const x = offsetX > 0 ? firstX - i : firstX + i
      walls[`${withGrid(x)},${withGrid(firstY)}`] = true
    }
  } else {
    console.log('not a straight line')
  }
  return walls
}

const roundDownGrid = (position) => position - (position % 16)

const nextPosition = (initialX, initialY, direction) => {
  let x = initialX
  let y = initialY
  const size = 16
  if (direction === 'left') {
    x -= size
  } else if (direction === 'right') {
    x += size
  } else if (direction === 'up') {
    y -= size
  } else if (direction === 'down') {
    y += size
  }

  return { x, y }
}

const emitEvent = (name, detail) => {
  const event = new CustomEvent(name, {
    detail
  })
  document.dispatchEvent(event)
}

const getOppositeDirection = (direction) => {
  console.log(direction)
  if (direction === 'left') return 'right'
  if (direction === 'right') return 'left'
  if (direction === 'up') return 'down'
  return 'up'
}

const utils = {
  withGrid,
  asGridCoord,
  nextPosition,
  emitEvent,
  getOppositeDirection,
  drawWallLineCoord,
  roundDownGrid
}

export default utils
