import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Immutable, { List } from 'immutable';
import { COLORS } from '../../styles/clrs';

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

  render() {
    return (
      <View style={styles.card}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }

}

Stats.propTypes = {
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
