import React from 'react'

import Spread from 'material-ui/svg-icons/action/open-in-new'
import FavoBor from 'material-ui/svg-icons/action/favorite-border'
import Share from 'material-ui/svg-icons/Social/share'
import { curtail } from '../../common/util'

const DEFAULT = {
  id: '001',
  name: "Time to say goodbye",
  singer: "Lauren Aquilina",
  src: "./img/0.png",
  maximumLength: 18,
}

class SongPane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      hoverName: false,
      hoverSinger: false,
      hoverFavoBor: false,
      hoverShare: false,
    }
  }
  render() {
    return (
      <div
        onMouseOver={() => this.setState({ hover: true })}
        onMouseOut={() => this.setState({ hover: false })}
        style={styles.container}>
        <div className="flex-c-c">
          <img style={styles.img} src={DEFAULT.src} alt="" />
          <div
            className="flex-c-c"
            style={Object.assign({
                background: this.state.hover ? '#0004' : '#fff0',
            }, styles.mask)}>
            <Spread
              color="#fffc"
              style={Object.assign(
                  this.state.hover ? {} : { display: 'none' }, styles.spread)}/>
          </div>
        </div>
        <div style={styles.grid}>
          <span
            onMouseOver={() => this.setState({ hoverName: true })}
            onMouseOut={() => this.setState({ hoverName: false })}
            style={{ color: this.state.hoverName ? '#444' : '#666' }}>
            {curtail(DEFAULT.name, DEFAULT.maximumLength)}
          </span>
          <FavoBor
            onMouseOver={() => this.setState({ hoverFavoBor: true })}
            onMouseOut={() => this.setState({ hoverFavoBor: false })}
            style={styles.icon}
            color={this.state.hoverFavoBor ? "#666" : "#999"}/>
          <span
            onMouseOver={() => this.setState({ hoverSinger: true })}
            onMouseOut={() => this.setState({ hoverSinger: false })}
            style={{ color: this.state.hoverSinger ? '#666' : '#999' }}>
            {curtail(DEFAULT.singer, DEFAULT.maximumLength)}
          </span>
          <Share
            onMouseOver={() => this.setState({ hoverShare: true })}
            onMouseOut={() => this.setState({ hoverShare: false })}
            style={styles.icon}
            color={this.state.hoverShare ? "#666" : "#999"}/>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    height: 64,
    borderTop: '2px solid #eaeaea',
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    cursor: 'pointer',
  },
  img: {
    width: 54,
    height: 54,
    borderRight: '1px solid #eee',
    cursor: 'pointer',
  },
  mask: {
    position: 'absolute',
    width: 54,
    height: 54,
  },
  spread: {
    width: 48,
    height: 48,
  },
  grid: {
    margin: '5px 0',
    display: 'grid',
    gridTemplateColumns: '5fr 1fr',
    gridTemplateRows: '1fr 1fr',
    fontSize: 14,
  },
  icon: {
    height: 18,
    width: 18,
    margin: 3,
  },
}

export default SongPane