const PubNub = require('pubnub')
const config = require('dotenv').config({
  path: 'config/.env'
})

const {
  PUBLISH_KEY,
  SUBSCRIBE_KEY,
  SECRET_KEY
} = config.parsed

const credentials = {
  publishKey: PUBLISH_KEY,
  subscribeKey: SUBSCRIBE_KEY,
  secretKey: SECRET_KEY
}

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN'
}

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain

    this.pubnub = new PubNub(credentials)
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) })
    this.pubnub.addListener(this.listener())
  }

  listener() {
    return {
      message: messageObject => {
        const { channel, message } = messageObject

        console.log(`Message received. Channel: ${channel}. Message: ${message}`)

        const parsedMessage = JSON.parse(message)

        if (channel === CHANNELS.BLOCKCHAIN) {
          this.blockchain.replaceChain(parsedMessage)
        }
      }
    }
  }

  publish({ channel, message }) {
    // there is an unsubscribe function in pubnub
    // but it doesn't have a callback that fires after success
    // therefore, redundant publishes to the same local subscriber will be accepted as noisy no-ops
    this.pubnub.publish({ channel, message })
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    })
  }
}

module.exports = PubSub
