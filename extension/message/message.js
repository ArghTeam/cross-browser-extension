import ext from '../extension'

const isSafari = process.env.browser === 'safari'

const contentSendMessage = message => {
  const { action } = message.action
  const responseAction = `RESPONSE_${action}`
  return new Promise(resolve => {
    const listener = response => {
      if (response.action !== responseAction) return
      ext.runtime.onMessage.removeListener(listener)
      return resolve(response)
    }
    ext.runtime.onMessage.addListener()
    ext.runtime.sendMessage(message)
  })
}

const contentOnMessage = (action, onMessage) => {
  ext.runtime.onMessage.addListener(message => {
    if (message.action !== action) return

    const sendResponse = (data = {}) => {
      ext.runtime.sendMessage({ action: `RESPONSE_${action}`,...data })
    }

    return onMessage(sendResponse)
  })
}

const backgroundSendMessage = (tabId, message, frameId) => {
  const { action } = message.action
  const responseAction = `RESPONSE_${action}`
  return new Promise(resolve => {
    const listener = response => {
      if (response.action !== responseAction) return
      ext.runtime.onMessage.removeListener(listener)
      return resolve(response)
    }
    ext.runtime.onMessage.addListener()
    ext.runtime.sendMessage(tabId, message, { frameId })
  })
}

const backgroundOnMessage = (action, onMessage) => {
  ext.runtime.onMessage.addListener((message, sender) => {
    if (message.action !== action) return

    const sendResponse = (data = {}) => {
      const { tab, frameId } = sender
      ext.tabs.sendMessage(tab.id, { action: `RESPONSE_${action}`,...data }, { frameId })
    }

    return onMessage(sendResponse)
  })
}


export default {
  contentSendMessage: contentSendMessage,
  contentOnMessage: contentOnMessage,
  backgroundSendMessage: backgroundSendMessage,
  backgroundOnMessage: backgroundOnMessage
}
