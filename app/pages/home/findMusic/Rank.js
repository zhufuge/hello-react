import React from 'react'
import { connect } from 'react-redux'
import { setPresentSong, setHomeSubj, setSongSheet } from '../../../actions'
import Ajax from '../../../common/Ajax'
import { RANK } from '../../../common/strings'

import Divider from 'material-ui/Divider'
import List from './RankList'
import CardPane from './CardPane'
import Card from './Card'

class Rank extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      top: [],
      newest: [],
      original: [],
      hot: [],
      singer: [],
      sheets: Array(10).fill(0).map((v, i) => i),
    }
  }

  componentWillMount() {
    Ajax('rank').then(json => json && this.setState(Object.assign({}, json)))
  }

  componentDidMount() {
    this.updateDimensions.call(this)
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  updateDimensions() {
    this.setState({ offsetWidth: this.wrapper.offsetWidth })
  }

  handleSongClick(song) {
    this.props.setPresentSong(song)
    this.props.setHomeSubj('2')
  }

  handleSingerClick(singer) {
    this.props.setSongSheet(singer)
    this.props.setHomeSubj('6')
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.title}>{RANK.OFFICIAL}</div>
        <Divider />
        <div
          ref={ref => this.wrapper = ref}
          style={styles.wrapper(Math.trunc(this.state.offsetWidth / 260))}>
          {RANK.LIST.map((v, i) =>
            <List
              key={'rank-list-' + v.title + i}
              title={v.title}
              headerStyle={{ background: v.color }} />
          )}
        </div>
        <div style={styles.title}>{RANK.GLOBAL}</div>
        <Divider />
        <CardPane>
          {this.state.sheets.map((v, i) =>
            <Card
              key={'rank-card-' + v.id + i}
              primary={true}
              value={v.name}
              onClick={() => v.id}
              src={v.src}/>
          )}
        </CardPane>
      </div>
    )
  }
}

const styles = {
  container: {
    marginTop: 16,
  },
  title: {
    color: '#555',
    fontSize: 18,
    margin: '0 0 8px',
  },
  wrapper: (n) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${n}, 1fr)`,
    gridGap: '24px 12px',
    margin: '12px auto 36px',
  }),
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPresentSong: (song) => dispatch(setPresentSong(song)),
    setHomeSubj: (subj) => dispatch(setHomeSubj(subj)),
    setSongSheet: (sheet) => dispatch(setSongSheet(sheet)),
  }
}

export default connect(null, mapDispatchToProps)(Rank)