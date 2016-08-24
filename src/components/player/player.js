import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../../styles/clrs';

export default class Player extends Component {

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
      <Animated.View style={[styles.player, {
        top: this.state.position.x,
        left: this.state.position.y,
      }]}>
        <Text style={styles.text}>{this.props.label}</Text>
      </Animated.View>
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

Player.propTypes = {
  eventLength: PropTypes.number,
  label: PropTypes.string,
  positions: PropTypes.array,
};

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
    top: 50,
    left: 50,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: COLORS.royalBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: COLORS.transparent,
    fontSize: 8,
    color: COLORS.white,
  },
});
