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
  actionSwitchBreakout,
} from '../../actions/breakout';

import FacebookTabBar from '../../components/tab-bar/tab-bar.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Stats from '../../components/stats/stats';
import Breakout from '../../components/breakout/breakout';
// import PowerPlay from '../../components/powerplay/powerplay';
import GoalLocation from '../../components/goal-location/';

const tabNames = ['Stats', 'Breakout', 'Shots', 'Goals', 'Settings'];

function Home(props) {
  return (
    <ScrollableTabView
      style={styles.container}
      initialPage={3}
      tabBarPosition={'bottom'}
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

      <ScrollView tabLabel="ios-chatboxes" style={styles.tabView} />

      <ScrollView tabLabel="ios-notifications" style={styles.tabView}>
        <GoalLocation
          goals={props.goalPctg}
        />
      </ScrollView>

      <ScrollView tabLabel="ios-list" style={styles.tabView}>
        <View style={styles.card}
          actionSwitchTeam={props.actionSwitchTeam}
        >
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
  actionSwitchTeam: PropTypes.func,
  breakoutPlay: PropTypes.string,
  breakoutPlays: PropTypes.instanceOf(List),
  eventLength: PropTypes.number,
  goalPctg: PropTypes.object,
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
    goalPctg: state.goals.get('rates'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionFetchStats: () => dispatch(apiFetchStats()),
    actionStartAnimation: () => dispatch(actionStartAnimation()),
    actionStopAnimation: () => dispatch(actionStopAnimation()),
    actionSwitchBreakout: (play) => dispatch(actionSwitchBreakout(play)),
    actionSwitchEvent: (eventNum) => dispatch(actionSwitchEvent(eventNum)),
    actionSwitchTeam: (team) => dispatch(actionSwitchTeam(team)),
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
