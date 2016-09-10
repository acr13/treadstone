import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Immutable, { List } from 'immutable';
import { COLORS } from '../../styles/clrs';
import Button from '../button/button';

export default class Stats extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2),
    });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.statList.toJS()),
    };
  }

  componentWillReceiveProps(newProps) {
    this.state = {
      dataSource: this.state.dataSource.cloneWithRows(newProps.statList.toJS()),
    };
  }

  componentWillMount() {
    this.props.actionFetchStats();
  }

  _getpctg(n) {
    if (!n || isNaN(n)) {
      return 0;
    }

    return (n * 100).toFixed() + '%';
  }

  _renderHeader() {
    return (
      <View style={styles.row}>
        <Text style={[styles.name, styles.bold]}>{'Name'}</Text>
        <Text style={[styles.sat, styles.bold]}>{'SAT'}</Text>
        <Text style={[styles.satrel, styles.bold]}>{'SAT Rel%'}</Text>
        <Text style={[styles.satrel60, styles.bold]}>{'SAT Rel60'}</Text>
      </View>
    );
  }

  _renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.name}>{rowData.playerName}</Text>
        <Text style={styles.sat}>{rowData.shotAttempts}</Text>
        <Text style={styles.satrel}>{this._getpctg(rowData.shotAttemptsRelPctg)}</Text>
        <Text style={styles.satrel60}>{rowData.shotAttemptsRelPer60Minutes}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.card}>
          { this._renderHeader() }
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this._renderRow(rowData)}
          />
        </View>
      </View>
    );
  }

}

Stats.propTypes = {
  actionFetchStats: PropTypes.func,
  statList: PropTypes.instanceOf(List),
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.veryLightGray,
    margin: 5,
    padding: 15,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  bold: {
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    width: 60,
    fontSize: 9,
  },
  sat: {
    flex: 1,
    fontSize: 9,
    textAlign: 'center',
  },
  satrel: {
    flex: 1,
    fontSize: 9,
    textAlign: 'center',
  },
  satrel60: {
    flex: 1,
    fontSize: 9,
    textAlign: 'center',
  },
});
