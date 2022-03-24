import images from './assets'
import utils from './utils'

import NPC from './game/NPC'

const map = {
  MainRoom: {
    lowerSrc: images.MainRoomL1,
    upperSrc: images.MainRoomL2,
    gameObjects: {
      person: {
        // hero: new Person({
        //   x: utils.withGrid(4),
        //   y: utils.withGrid(3),
        //   src: images.char,
        //   isPlayerControlled: true
        // })
      }
    },
    walls: {
      ...utils.drawWallLineCoord([1, 1], [11, 1]),
      ...utils.drawWallLineCoord([0, 3], [0, 10]),
      ...utils.drawWallLineCoord([11, 3], [11, 10])
    },
    cutSceneSpaces: {
      [utils.asGridCoord(15, 11)]: [
        {
          events: [
            { type: 'changeMap', map: 'Cafe' }
          ]
        }
      ]
    }
  },
  Cafe: {
    lowerSrc: images.CafeRoomL1,
    uppserSrc: images.CafeRoomL2
  },
  SignUpRoom: {
    lowerSrc: images.SignUpRoomL1,
    upperSrc: images.SignUpRoomL2,
    gameObjects: {
      person: {
        npc1: new NPC({
          x: utils.withGrid(7.5),
          y: utils.withGrid(10),
          src: images.char
        })
      }
    },
    cutSceneSpaces: {
      [utils.asGridCoord(7.5, 14)]: [
        {
          events: [
            { who: 'npc1', type: 'walk', direction: 'down' },
            { who: 'npc1', type: 'walk', direction: 'down' },
            { who: 'npc1', type: 'walk', direction: 'down' },
            { who: 'npc1', type: 'walk', direction: 'down' },
            { who: 'npc1', type: 'walk', direction: 'down' },
            { who: 'npc1', type: 'stand', direction: 'left', time: 800 },
            { who: 'npc1', type: 'stand', direction: 'right', time: 800 },
            { who: 'npc1', type: 'stand', direction: 'down', time: 800 },
            { type: 'textMessage', text: 'Hey welcome! It\'s been awhile since I\'ve seen a new face around here!' },
            { type: 'textMessage', text: 'You look like you\'re new around here.. ' },
            { type: 'textMessage', text: 'But!! You do look kind of familiar.. Remind me who you are again?' },
            { type: 'signUp' }
          ]
        }
      ]

    }
  }
}

export default map
