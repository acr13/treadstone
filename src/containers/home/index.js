import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { jumpTo } from '../../actions/navigator';
import { SCENES } from '../../constants';
import { COLORS } from '../../styles/clrs';

import FacebookTabBar from '../../components/tab-bar/tab-bar.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const tabNames = ['Stats', 'PK', 'Net', 'PP', 'Settings'];

function Home() {
  return (
    <ScrollableTabView
      style={styles.container}
      initialPage={1}
      tabBarPosition={'bottom'}
      renderTabBar={() => <FacebookTabBar tabNames={tabNames} />}
    >
      <ScrollView tabLabel="ios-paper" style={styles.tabView}>
        <View style={styles.card}>
          <Text>News</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-people" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Friends</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Messenger</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Notifications</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="ios-list" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Other nav</Text>
        </View>
      </ScrollView>
    </ScrollableTabView>
  );
}

Home.propTypes = {
  goToNextPageAction: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    goToNextPageAction: () => dispatch(jumpTo({ key: SCENES.SCENE_TWO })),
  };
}

export default connect(
  () => ({}), mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.veryLightGray,
  },
  card: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.veryLightGray,
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
