import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import { COLORS } from '../../styles/clrs';

export default class Puck extends Component {

  constructor(props) {
    super(props);

    if (!this.props.positions) {
      this.state = {
        position: new Animted.ValueXY(),
      };

      return;
    }

    this.state = {
      position: new Animated.ValueXY({
        x: this.props.positions[0].x,
        y: this.props.positions[0].y,
      }),
    };
  }

  componentDidMount() {
    this.animatePoint(1);
  }

  render() {
    return (
      <Animated.View style={[styles.puck, {
        top: this.state.position.x,
        left: this.state.position.y,
      }]} />
    );
  }

  animatePoint(idx) {
    if (idx > (this.props.positions.length - 1)) {
      return;
    }

    Animated.timing(this.state.position, {
      toValue: {
        x: this.props.positions[idx].x,
        y: this.props.positions[idx].y,
      },
      duration: this.props.eventLength,
      easing: Easing.inOut(Easing.ease),
    }).start(() => this.animatePoint(idx + 1));
  }

}

Puck.propTypes = {
  eventLength: PropTypes.number,
  positions: PropTypes.array,
};

const styles = StyleSheet.create({
  puck: {
    position: 'absolute',
    top: 50,
    left: 50,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.black,
  },
});
