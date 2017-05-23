const { BASE_URL } = process.env

export const getAuthCookies = (list, callback) =>
  chrome.cookies.getAll({ url: BASE_URL }, Cookies => callback((Cookies || []).filter(cookie => list.indexOf(cookie.name) > -1)))

