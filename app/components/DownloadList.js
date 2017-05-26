import React from 'react';
import {connect} from 'react-redux';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class DownloadList extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      songs: []
    };
  }

  componentWillMount() {
    fetch('/downloadList', {
      method: "POST",
      header: {
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      body: `username=${this.props.username}`
    }).then(
      res => (res.ok) ? res.json() : undefined,
      e => console.log('连接失败', e)
    ).then(json => {
      if (json) {
        this.setState({
          songs: json.songs
        });
      }
    });
  }

  header() {
    const data = ['序号', '音乐标题', '歌手', '专辑', '时长', '下载时间'];
    return data.map((v) => {
      return <TableHeaderColumn key={v}>{v}</TableHeaderColumn>;
    });
  }

  rowColumns(data) {
    return data.map(v => {
      return <TableRowColumn key={v}>{v}</TableRowColumn>;
    });
  }

  tableRow() {
    const data = this.state.songs;
    return data.map((v, i) => {
      const value = [i + 1, v, '---', '---', '---', '---'];
      return (
    		<TableRow key={v.name}>
          {this.rowColumns(value)}
    		</TableRow>
      );
    });
  }

	render() {
		return(
			<div style={styles.container}>
				<div style={styles.downloadList}>
					<Subheader style={{fontSize: 20}}>已下载的单曲</Subheader>
					<Divider />
					<Table>
    				<TableHeader
              displaySelectAll={false}
            	adjustForCheckbox={false}>
    				  <TableRow>{this.header()}</TableRow>
    				</TableHeader>
    				<TableBody
              displayRowCheckbox={false}>
              {this.tableRow()}
    				</TableBody>
  				</Table>
  			</div>
			</div>
    );
	}
}
const styles = {
  container: {
    width: 820,
    height: 600,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  downloadList: {
    width: '100%',
    marginTop: 20,
  },
};

const mapStateToProps = (state) => {
  return {
    username: state.username
  };
};

export default connect(mapStateToProps)(DownloadList);
