import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

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

  _getColorStyle(n) {
    let c = 'blue';
    let opc = 0.2;

    if (n > 10) {
      c = 'red';
      opc = 0.9;
    } else if (n > 7) {
      c = 'yellow';
      opc = 0.8;
    } else if (n > 4) {
      c = 'lime';
      opc = 0.7;
    } else if (n > 2) {
      c = 'cyan';
      opc = 0.4;
    }

    return { backgroundColor: c, opacity: opc};
  }

  renderShots() {
    return this.props.shots.map((shot, idx) => {
      const pt = this._convertPt(shot.coordinates);
      const colorStyle = this._getColorStyle(shot.count);

      return (
        <Circle
          key={idx}
          cx={pt.y}
          cy={pt.x}
          r="10"
          fill={colorStyle.backgroundColor}
          fillOpacity={colorStyle.opacity}
        />
      );
    });
  }

  render() {
    const shots = this.renderShots();

    return (
      <View>
        <Ice />
        <Svg
          style={[styles.abs, styles.tl5]}
          height="400"
          width="400"
        >
          { shots }
        </Svg>
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
    height: 15,
    width: 15,
    // borderRadius: 7.5,
    backgroundColor: '#000',
  },
});
