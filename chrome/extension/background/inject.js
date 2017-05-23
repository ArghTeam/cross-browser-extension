const { BASE_URL, APP_URL } = process.env

const isOpera = /OPR/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const isInjected = (tabId, cb) => {
  return chrome.tabs.executeScript(tabId, {
    code: `var injected = window.healthtagitInjected;
      window.healthtagitInjected = true;
      //This is a hack for addStyles if no head tag
      if (!(document.head || document.getElementsByTagName("head")[0])) {
        var head = document.createElement('head');
        var html = document.querySelector('html');
        html.insertBefore(document.createElement("head"), html.firstChild);
      }
      injected;`,
    runAt: 'document_start'
  }, cb);
};

const loadScript = (name, tabId, cb) => {
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.executeScript(tabId, { file: `/js/${name}.bundle.js`, runAt: 'document_idle' }, cb);
  } else {
    // dev: async fetch bundle
    fetch(`https://argh.local:4000/js/${name}.bundle.js`)
    .then(res => res.text())
    .then((fetchRes) => {
      // Load redux-devtools-extension inject bundle,
      // because inject script and page is in a different context
      const request = new XMLHttpRequest();
      const devToolsPath = `chrome-extension://${ isOpera ? 'fkccnknhemllppjfmkdfiphkjkbejdmn' : 'lmhkpmbekcpmknklioeibfkpmmfibljd' }/js/redux-devtools-extension.js`;

      request.open('GET', devToolsPath);  // sync
      request.send();
      request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          chrome.tabs.executeScript(tabId, { code: request.responseText, runAt: 'document_start' });
        }
      };
      chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, cb);
    });
  }
};

const arrowURLs = ['^https://|http://'];
const newTabUrl = 'chrome://newtab'

const injectScript = (tabId, changeInfo, tab) => {
  if (tab.url.indexOf(BASE_URL) > -1) return
  if (tab.url.indexOf(newTabUrl) > -1) return chrome.tabs.update(tabId, {url: `${BASE_URL}${APP_URL}`})

  if ((changeInfo && changeInfo.status !== 'loading') || !tab.url.match(arrowURLs.join('|'))) return;

  //const result = await isInjected(tabId);

  isInjected(tabId, result => {
    if (chrome.runtime.lastError) return;

    if (result[0]) return chrome.tabs.sendMessage(tabId, { action: 'TOGGLE_APP', tabId: tabId }, response => {});

    if (process.env.NODE_ENV === 'production') {
      loadScript('commons', tabId, () => {})
    }
    loadScript('content', tabId, () => {});
  });
};

chrome.browserAction.onClicked.addListener(tab => injectScript(tab.id, null, tab));
