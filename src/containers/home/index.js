import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List } from 'immutable';
import { COLORS } from '../../styles/clrs';
import { apiFetchStats } from '../../actions/stats';
import {
  actionStartAnimation,
  actionStopAnimation,
  actionSwitchBreakout
} from '../../actions/breakout';

import FacebookTabBar from '../../components/tab-bar/tab-bar.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Stats from '../../components/stats/stats';
import Breakout from '../../components/breakout/breakout';
import PowerPlay from '../../components/powerplay/powerplay';

const tabNames = ['Stats', 'Breakout', 'Net', 'PP', 'Settings'];

function Home(props) {
  return (
    <ScrollableTabView
      style={styles.container}
      initialPage={1}
      tabBarPosition={'bottom'}
      prerenderingSiblingsNumber={Infinity}
      renderTabBar={() => <FacebookTabBar tabNames={tabNames} />}
    >
      <ScrollView tabLabel="ios-paper" style={styles.tabView}>
        <Stats
          statList={props.statList}
          actionFetchStats={props.actionFetchStats}
        />
      </ScrollView>

      <ScrollView tabLabel="ios-people" style={styles.tabView}>
        <Breakout eventLength={props.eventLength}
          actionStartAnimation={props.actionStartAnimation}
          actionStopAnimation={props.actionStopAnimation}
          actionSwitchBreakout={props.actionSwitchBreakout}
          play={props.breakoutPlay}
          plays={props.breakoutPlays}
          isBreakoutAnimating={props.isBreakoutAnimating}
        />
      </ScrollView>

      <ScrollView tabLabel="ios-chatboxes" style={styles.tabView}>
        <PowerPlay eventLength={props.eventLength} />
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
  actionFetchStats: PropTypes.func,
  actionStartAnimation: PropTypes.func,
  actionStopAnimation: PropTypes.func,
  actionSwitchBreakout: PropTypes.func,
  breakoutPlay: PropTypes.string,
  breakoutPlays: PropTypes.instanceOf(List),
  eventLength: PropTypes.number,
  isBreakoutAnimating: PropTypes.bool,
  statList: PropTypes.instanceOf(List),
};

function mapStateToProps(state) {
  return {
    eventLength: state.breakouts.get('TIME_OF_EVENTS'),
    breakoutPlay: state.breakouts.get('currentPlay'),
    breakoutPlays: state.breakouts.get('plays'),
    isBreakoutAnimating: state.breakouts.get('isAnimating'),
    statList: state.stats.get('statList'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionFetchStats: () => dispatch(apiFetchStats()),
    actionStartAnimation: () => dispatch(actionStartAnimation()),
    actionStopAnimation: () => dispatch(actionStopAnimation()),
    actionSwitchBreakout: (play) => dispatch(actionSwitchBreakout(play)),
    actionSwitchEvent: (eventNum) => dispatch(actionSwitchEvent(eventNum)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
