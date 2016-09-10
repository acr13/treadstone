import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import Ice from '../ice/ice';

export default class GoalLocation extends React.Component {

  _renderPctg(num) {
    if (isNaN(num)) {
      return 0 + '%';
    }

    return (num * 100).toFixed() + '%';
  }

  render() {
    return (
      <View>
        <Ice />
        <Svg
          style={[styles.abs, styles.tl5]}
          height="400"
          width="350"
        >
          <Polygon
            points="5,27 285,27 285,160 5,160"
            fill="blue"
            fillOpacity="0.3"
            stroke="black"
            strokeWidth="1"
          />
          <Polygon
            points="60,27 230,27 230,120, 200,140, 90,140, 60,120"
            fill="lime"
            fillOpacity="0.4"
            stroke="black"
            strokeWidth="1"
          />
          <Polygon
            points="80,27 210,27 210,100, 200,110, 90,110, 80,100"
            fill="red"
            fillOpacity="0.6"
            stroke="purple"
            strokeWidth="1"
          />

          <Polygon
            points="5,245 285,245 285,377 5,377"
            fill="blue"
            fillOpacity="0.3"
            stroke="black"
            strokeWidth="1"
          />
          <Polygon
            points="60,284 90,262, 200,262 230,284 230,377 60,377"
            fill="lime"
            fillOpacity="0.4"
            stroke="black"
            strokeWidth="1"
          />
          <Polygon
            points="80,304 90,294 200,294 210,304 210,377 80,377"
            fill="red"
            fillOpacity="0.6"
            stroke="purple"
            strokeWidth="1"
          />
        </Svg>

        <Text style={[styles.abs, styles.offHigh]}>{this._renderPctg(this.props.goals.offHigh)}</Text>
        <Text style={[styles.abs, styles.offMid]}>{this._renderPctg(this.props.goals.offMid)}</Text>
        <Text style={[styles.abs, styles.offLow]}>{this._renderPctg(this.props.goals.offLow)}</Text>
        <Text style={[styles.abs, styles.defHigh]}>{this._renderPctg(this.props.goals.defHigh)}</Text>
        <Text style={[styles.abs, styles.defMid]}>{this._renderPctg(this.props.goals.defMid)}</Text>
        <Text style={[styles.abs, styles.defLow]}>{this._renderPctg(this.props.goals.defLow)}</Text>
      </View>
    );
  }
}

GoalLocation.propTypes = {
  goals: React.PropTypes.object,
};

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
  },
  tl5: {
    top: 5,
    left: 5,
  },
  offHigh: {
    top: 70,
    left: 130,
    color: '#FFFFFF',
  },
  offMid: {
    top: 120,
    left: 130,
    color: '#FFFFFF',
  },
  offLow: {
    top: 150,
    left: 130,
    color: '#FFFFFF',
  },
  defHigh: {
    top: 325,
    left: 130,
    color: '#FFFFFF',
  },
  defMid: {
    top: 280,
    left: 130,
    color: '#FFFFFF',
  },
  defLow: {
    top: 253,
    left: 130,
    color: '#FFFFFF',
  },
});
