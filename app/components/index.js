import React from 'react';

import Header from './Header';
import AppList from './AppList';
import AppTabs from './AppTabs';
import SongCard from './SongCard';
import DownloadList from './DownloadList';
import SongSheet from './SongSheet';
import Player from './player';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {page: '0'};

    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    this.setState({page});
  }

  page(index) {
    switch(index) {
    case '0': return <AppTabs />;
    case '1':
    case '2': return <SongCard />;
    case '4': return <DownloadList />;
    case '5': return <SongSheet />;
    default: return <AppTabs />;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div style={styles.container}>
          <AppList page={this.state.page} setPage={this.setPage}/>
          {this.page(this.state.page)}
        </div>
        <Player />
      </div>
    );
  }
}


const styles = {
  container: {
    margin: '70px 0 0 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
};

export default Index;
