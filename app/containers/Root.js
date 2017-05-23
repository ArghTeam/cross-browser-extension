import React, { Component, PropTypes } from 'react'
import App from './App'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import notification from '../reducers/notification'

const combinedReducers = combineReducers({ notification })

const store = createStore(
  combinedReducers,
  applyMiddleware(thunk)
)

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
          <App />
      </Provider>
    )
  }
}
