const { COOKIE_NAME, BASE_URL, LOGIN_URL, NODE_ENV } = process.env

const url = NODE_ENV === 'development' ? 'https://argh.local:8008/items' : BASE_URL

const needNewApplicationTab = callback => {
  let exist = false
  chrome.windows.getAll({ populate: true }, windows => {
    windows.forEach(window => {
      window.tabs.forEach(tab => {
        if (!exist && tab.url.indexOf(BASE_URL) > -1) {
          chrome.tabs.update(tab.id, { active: true, selected: true })
          exist = true
        }
      })
    })
    callback(exist)
  })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.indexOf(url) > -1) {
    chrome.cookies.set({
      name: 'hti-ext-installed',
      url: url,
      value: 'installed'
    }, (cookie) => {})
  }
})

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install'){
    needNewApplicationTab(exist => exist ? null : chrome.tabs.create({ url: `${BASE_URL}/register` }))
  }
})
