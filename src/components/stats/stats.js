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

  _renderRow(rowData) {
    return (
      <Text>{rowData.playerName}</Text>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.card}>
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this._renderRow(rowData)}
          />
        </View>

        <Button onPress={() => this.props.actionFetchStats()}
          text={'Fetch'}
        />
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
});
