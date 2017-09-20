import React from 'react'

import Play from 'material-ui/svg-icons/av/play-circle-outline'

const DEFAULT = {
  id: '001',
  name: "Time to say goodbye",
  singer: "Lauren Aquilina",
  src: "./img/0.png",
}

class RecommendList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: -1,
    }
  }

  render() {
    const props = this.props
    return (
      <div className="flex-wrap" style={styles.container}>
        {props.items.map((v, i) =>
          <div
            onDoubleClick={() => this.props.setSong(v.id || DEFAULT.id)}
            onMouseOver={() => this.setState({ hover: i })}
            onMouseOut={() => this.setState({ hover: -1 })}
            style={Object.assign(
                i < 5 ? {} : { borderLeft: '1px solid #eee' },
                (i < 5 && i % 2 === 0) || (i >= 5 && i % 2 === 1)
                ? {} : { background: '#fafafa' },
                this.state.hover === i ? { background: '#eee' } : {},
                styles.listItem)}>
            <div className="flex-c-c" style={styles.number}>
              {(i + 1).toString().padStart(2, '0')}
            </div>
            <div
              className="flex-c-c"
              onClick={() => this.props.setSong(v.id || DEFAULT.id)}>
              <img style={styles.img} src={DEFAULT.src} alt="" />
              <Play style={styles.mask}/>
            </div>
            <div className="flex-c-c" style={styles.info}>
              <div style={styles.name}>{v.name || DEFAULT.name}</div>
              <div style={Object.assign(
                  { color: this.state.hover === i ? '#666' : '#999' },
                  styles.singer)}>
                {v.singer || DEFAULT.singer}
              </div>
            </div>
          </div>)}
      </div>
    )
  }
}

const styles = {
  container: {
    margin: '16px auto 36px',
    flexDirection: 'column',
    height: 320,
    border: '1px solid #eee',
  },
  listItem: {
    display: 'grid',
    gridTemplateColumns: '48px 64px 1fr',
    height: 64,
    cursor: 'default',
  },
  number: {
    color: '#999',
    fontWeight: '300',
  },
  img: {
    width: 48,
    height: 48,
    border: '1px solid #eee',
    cursor: 'pointer',
  },
  mask: {
    width: 28,
    height: 28,
    position: 'absolute',
    cursor: 'pointer',
    color: '#fffc',
  },
  info: {
    flexDirection: 'column',
    alignItems: 'start',
    marginLeft: 8,
  },
  name: {
    color: '#666',
    fontWeight: '400',
  },
  singer: {
    fontWeight: '400',
    fontSize: 13,
    cursor: 'pointer',
  },
}

export default RecommendList
