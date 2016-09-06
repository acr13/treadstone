import React from 'react';
import {
  StyleSheet,
  // Text,
  View,
} from 'react-native';
// import Svg, { Polygon } from 'react-native-svg';

import Ice from '../ice/ice';

export default class GoalLocation extends React.Component {

  constructor(props) {
    super(props);

    props.actionFetchGame(2015030411);
  }

  render() {
    return (
      <View>
        <Ice />
      </View>
    );
  }
}

GoalLocation.propTypes = {
  actionFetchGame: React.PropTypes.func,
  goals: React.PropTypes.object,
};

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
  },
});
