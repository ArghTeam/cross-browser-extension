const PROTOCOL = window.location.search.replace('?protocol=', '')

const { BASE_URL } = process.env

const checkStatus = response => response.json().then(json => ({ json, response }))
const parseJSON = ({json, response}) => response.ok === false ? Promise.reject(response, json) : json

export const get = url =>
  fetch(`${BASE_URL}${url}`, {
    credentials: 'include'
  })
    .then(checkStatus)
    .then(parseJSON)

export const put = (url, data) =>
  fetch(`${BASE_URL}${url}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data || {}),
      credentials: 'include'
    })
    .then(checkStatus)
    .then(parseJSON)

export const post = (url, data) =>
  fetch(`${BASE_URL}${url}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data || {}),
      credentials: 'include'
    })
    .then(checkStatus)
    .then(parseJSON)

export const remove = (url, data) =>
  fetch(`${BASE_URL}${url}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify(data || {}),
      credentials: 'include'
    })
    .then(checkStatus)
    .then(parseJSON)

