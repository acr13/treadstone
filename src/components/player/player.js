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
    Animated.timing(this.state.position, {
      toValue: {
        x: this.props.positions[1].x,
        y: this.props.positions[1].y,
      },
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
    }).start();
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

}

Player.propTypes = {
  label: PropTypes.string,
  positions: PropTypes.array,
};

const styles = StyleSheet.create({
  player: {
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
