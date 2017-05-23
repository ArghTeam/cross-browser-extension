import * as Cookies from './cookies'

const { COOKIE_NAME, BASE_URL, LOGIN_URL } = process.env

const loginUrl = `${BASE_URL}${LOGIN_URL}`
const baseDomain = BASE_URL.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/)[1]
const authCookies = [COOKIE_NAME]

let waitLoginSender = null
let loginTab = null
let authCookiesFound = 0

const getAuth = sender => {
  const { tab, frameId } = sender
  return Cookies.getAuthCookies(authCookies, cookies => {
    let authorized = null
    if (cookies && cookies.length === authCookies.length) {
      authorized = cookies
    }
    chrome.tabs.sendMessage(tab.id, { action: 'CHECK_LOGIN', authorized }, { frameId })
  })
}

const onLoginSuccess = () => {
  const { tab } = waitLoginSender

  getAuth(waitLoginSender)

  waitLoginSender = null
  loginTab = null
  authCookiesFound = 0

  chrome.cookies.onChanged.removeListener(onLoginCookiesAdded)

  try {
    chrome.tabs.update(tab.id, {selected: true})
    chrome.tabs.remove(loginTab.id)
  } catch (e) {}

}

const onLoginCookiesAdded = (changeInfo = {}) => {
  const { domain, name } = changeInfo.cookie || {}
  if (domain === baseDomain && authCookies.indexOf(name) > -1) {
    authCookiesFound += 1

    if (authCookiesFound === authCookies.length) {
      onLoginSuccess()
    }
  }
}

const startLogin = sender => {
  const { tab, frameId } = sender
  waitLoginSender = sender
  return chrome.tabs.create({ url: loginUrl }, _tab => {
    loginTab = _tab
    chrome.tabs.sendMessage(tab.id, { action: 'STARTED_LOGIN' }, { frameId })
    chrome.cookies.onChanged.addListener(onLoginCookiesAdded)
  })
}


const messageHandler = (message, sender, sendResponse) => {
  const { action } = message

  switch(action) {
    case 'GET_AUTH':
      return getAuth(sender)
    case 'START_LOGIN':
      return startLogin(sender)
    default:
      return
  }
}

chrome.runtime.onMessage.addListener(messageHandler)
