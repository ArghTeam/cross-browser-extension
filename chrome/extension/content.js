require('../../app/components/Panel/fonts/fonts.css')
import React, { Component } from 'react'
import { render } from 'react-dom'
import Dock from '../../app/components/Dock/Dock'

const s = {
  dockStyle: {
    background: '#44C6ED',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '10px'
  }
}

class InjectApp extends Component {
  constructor(props) {
    super(props)
    this.state = { isVisible: true, loading: true }
  }

  render() {
    const { isVisible, loading } = this.state

    return (
        <Dock
          size={370}
          isVisible={isVisible}
        >
          { loading ? <div style={s.spinner}><Spinner/></div> : null }
          <div id="appFrameContainer" style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
            <iframe
              name="appApp"
              style={{ width: '100%', height: '100%'}}
              frameBorder={0}
              allowTransparency="true"
              onLoad={this.registerBridge}
              src={chrome.extension.getURL(`app.html?protocol=${location.protocol}`)}
            />
          </div>

        </Dock>
    )
  }
}

(function () {
  "use strict"
  const injectDOM = document.createElement('div')
  injectDOM.style.zIndex = '2147483647'
  injectDOM.style.position = 'relative'
  document.body.appendChild(injectDOM)
  render(<InjectApp />, injectDOM)
})()
