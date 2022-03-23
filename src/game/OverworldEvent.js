import utils from '../utils'
import config from '../gameConfig'

export default class OverworldEvent {
  constructor ({ map, event }) {
    this.map = map
    this.event = event
  }

  stand (resolve) {
    const who = this.map.gameObjects.person[this.event.who]
    who.startBehavior({
      map: this.map
    }, {
      type: 'stand',
      direction: this.event.direction,
      time: this.event.time
    })

    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener('PersonStandComplete', completeHandler)
        resolve()
      }
    }
    document.addEventListener('PersonStandComplete', completeHandler)
  }

  walk (resolve) {
    const who = this.map.gameObjects.person[this.event.who]
    who.startBehavior({
      map: this.map
    }, {
      type: 'walk',
      direction: this.event.direction,
      retry: true
    })

    // Set up a handler to complete when correct person is done walking, then resolve the event
    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener('PersonWalkingComplete', completeHandler)
        resolve()
      }
    }
    document.addEventListener('PersonWalkingComplete', completeHandler)
  }

  changeMap (resolve) {
    this.map.overworld.initMap(config[this.event.map])
    resolve()
  }

  textMessage (resolve) {
    utils.emitEvent('TextMessage', { text: this.event.text })
    const completeHandler = () => {
      document.removeEventListener('TextMessageDone', completeHandler)
      resolve()
    }

    document.addEventListener('TextMessageDone', completeHandler)
  }

  signUp (resolve) {
    utils.emitEvent('SignUp', {})

    const completeHandler = () => {
      document.removeEventListener('TextMessageDone', completeHandler)
      resolve()
    }

    document.addEventListener('TextMessageDone', completeHandler)
  }

  // changeMap (resolve) {
  //   const sceneTransition = new SceneTransition()
  //   sceneTransition.init(document.querySelector('.game-container'), () => {
  //     this.map.overworld.startMap(window.OverworldMaps[this.event.map])
  //     resolve()

  //     sceneTransition.fadeOut()
  //   })
  // }

  init () {
    return new Promise(resolve => {
      this[this.event.type](resolve)
    })
  }
}
