/**
 * Created by ftroitsky on 12/05/17.
 */
import React from 'react'

class Dock extends React.Component {

  static defaultProps = {
    size: 370,
    isVisible: false
  }

  static propTypes = {
    size: React.PropTypes.number.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    dockStyle: React.PropTypes.object
  }

  render = () => {

    const s = {
      dock:  {
        position: 'absolute',
        top: 0,
        right: this.props.isVisible ? 0 : this.props.size * -1,
        width: this.props.size,
        height: '100%',
        background: '#44C6ED',
        pointerEvents: 'all',
        transition: 'right 0.2s ease-out',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 4px'

      },
      wrapper: {
        overflow: 'hidden',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'fixed'
      }
    }

    return (
      <div style={s.wrapper}>
        <div style={s.dock} id="DockTest">{this.props.children}</div>
      </div>
    )
  }

}

export default Dock
