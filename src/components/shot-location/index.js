import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import Ice from '../ice/ice';

const NHL_X_MAX = 99;
const NHL_X_MIN = -99;
const NHL_Y_MAX = 42;
const NHL_Y_MIN = -42;

const OUR_X_MAX = 400;
const OUR_X_MIN = 0;
const OUR_Y_MAX = 290;
const OUR_Y_MIN = 0;

export default class ShotLocation extends React.Component {

  _convertPt(nhlPoint) {
    const xPercent = this.normalize(nhlPoint.x, NHL_X_MIN, NHL_X_MAX);
    const destX = xPercent * (Math.abs(OUR_X_MAX - OUR_X_MIN)) + OUR_X_MIN;
    const yPercent = this.normalize(nhlPoint.y, NHL_Y_MIN, NHL_Y_MAX);
    const destY = yPercent * (Math.abs(OUR_Y_MAX - OUR_Y_MIN)) + OUR_Y_MIN;

    return { x: destX, y: destY};
  }

  renderShots() {
    return this.props.shots.map((shot, idx) => {
      const pt = this._convertPt(shot.coordinates);

      return (
        <View
          key={idx}
          style={[styles.abs, styles.shot, {top: pt.x, left: pt.y}]}
        />
      );
    });
  }

  render() {
    const shots = this.renderShots();

    return (
      <View>
        <Ice />
        <View style={[styles.abs, styles.tl5]}>
          { shots }
        </View>
      </View>
    );
  }

  normalize(value, min, max) {
    return Math.abs((value - min) / (max - min));
  }
}

ShotLocation.propTypes = {
  shots: React.PropTypes.array,
};

const styles = StyleSheet.create({
  abs: {
    position: 'absolute',
  },
  tl5: {
    top: 5,
    left: 5,
  },
  shot: {
    height: 5,
    width: 5,
    borderRadius: 2.5,
    backgroundColor: '#000',
  },
});
