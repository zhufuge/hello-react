import React from 'react'
import { SHEET } from '../../../strings'

import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline'

const assign = Object.assign

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hoverImg: false,
      hoverText: false,
    }
  }

  render() {
    const props = this.props
    return (
      <div style={assign({}, styles.container, props.style)}>
        <div
          onMouseOver={() => this.setState({ hoverImg: true })}
          onMouseOut={() => this.setState({ hoverImg: false })}
          onClick={() => props.onClick()}
          style={{ position: 'relative', cursor: 'pointer' }}>
          <img
            src={props.src || SHEET.IMG}
            style={assign({}, styles.image, props.imgStyle)}/>
          <PlayIcon style={assign(
              (props.primary && this.state.hoverImg)
              ? {}
              : { display: 'none' },
              styles.mask,
          )} />
          <div style={assign(
              (props.primary && this.state.hoverImg)
              ? {}
              : { display: 'none' },
              styles.maskbg,
          )}>
          </div>
        </div>
        <p
          onMouseOver={() => this.setState({ hoverText: true })}
          onMouseOut={() => this.setState({ hoverText: false })}
          onClick={() => props.onClick()}
          style={assign(
              { color: this.state.hoverText ? '#333' : '#555' },
              styles.text,
              props.textStyle,
          )}>
          {props.value || SHEET.NAME}
        </p>
      </div>
    )
  }
}

const styles = {
  container: {
    width: 178,
    height: 236,
  },
  image: {
    width: 176,
    height: 176,
    border: '1px solid #eee',
  },
  mask: {
    width: 32,
    height: 32,
    position: 'absolute',
    color: '#fffc',
    bottom: 12,
    right: 9,
    zIndex: 100,
  },
  maskbg: {
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: 15,
    right: 12,
    zIndex: 99,
    background: '#0006',
    borderRadius: 25,
  },
  text: {
    margin: '5px 0',
    fontSize: 15,
    cursor: 'pointer',
  },
}

export default Card
