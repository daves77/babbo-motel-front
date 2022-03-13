import images from './assets'
import utils from './utils'

import Person from './game/Person'

const map = {
  DemoRoom: {
    lowerSrc: images.Test,
    gameObjects: {
      person: {
        hero: new Person({
          x: utils.withGrid(4),
          y: utils.withGrid(3),
          src: images.char,
          isPlayerControlled: true
        })
      }
    },
    walls: {
      ...utils.drawWallLineCoord([1, 2], [11, 2]),
      ...utils.drawWallLineCoord([0, 3], [0, 10]),
      ...utils.drawWallLineCoord([11, 3], [11, 10])
    }
  }
}

export default map
