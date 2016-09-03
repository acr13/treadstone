import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { List } from 'immutable';
import { COLORS } from '../../styles/clrs';
import { apiFetchStats } from '../../actions/stats';
import { actionSwitchTeam } from '../../actions/settings';
import {
  actionSwitchBreakout,
} from '../../actions/breakout';

import FacebookTabBar from '../../components/tab-bar/tab-bar.js';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Stats from '../../components/stats/stats';
import Breakout from '../../components/breakout/breakout';
import GoalLocation from '../../components/goal-location/';
import Settings from '../../components/settings';

const tabNames = ['Stats', 'Breakout', 'Shots', 'Goals', 'Settings'];

function Home(props) {
  return (
    <ScrollableTabView
      style={styles.container}
      initialPage={1}
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

      <View tabLabel="ios-list" style={styles.view}>
        <Settings
          actionSwitchTeam={props.actionSwitchTeam}
          selectedTeam={props.selectedTeam} />
      </View>
    </ScrollableTabView>
  );
}

Home.propTypes = {
  actionFetchStats: PropTypes.func,
  actionSwitchBreakout: PropTypes.func,
  actionSwitchTeam: PropTypes.func,
  breakoutPlay: PropTypes.string,
  breakoutPlays: PropTypes.instanceOf(List),
  eventLength: PropTypes.number,
  goalPctg: PropTypes.object,
  isBreakoutAnimating: PropTypes.bool,
  statList: PropTypes.instanceOf(List),
  selectedTeam: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    eventLength: state.breakouts.get('TIME_OF_EVENTS'),
    breakoutPlay: state.breakouts.get('currentPlay'),
    breakoutPlays: state.breakouts.get('plays'),
    isBreakoutAnimating: state.breakouts.get('isAnimating'),
    statList: state.stats.get('statList'),
    goalPctg: state.goals.get('rates'),
    selectedTeam: state.settings.get('selectedTeam'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionFetchStats: () => dispatch(apiFetchStats()),
    actionSwitchBreakout: (play) => dispatch(actionSwitchBreakout(play)),
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
  view: {
    flex: 1,
    backgroundColor: COLORS.veryLightGray,
  },
});
