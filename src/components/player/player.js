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
    this.state.animation = this.generateAnimation();
  }

  onAnimationFinish(event) {
    if (event.finished) {
      // reset positions
    }
  }

  render() {
    if (this.props.isAnimating) {
      this.state.animation.start(this.onAnimationFinish);
    } else {
      this.state.animation.stop();
    }

    return (
      <Animated.View style={[styles.player, {
        top: this.state.position.x,
        left: this.state.position.y,
      }]}>
        <Text style={styles.text}>{this.props.label}</Text>
      </Animated.View>
    );
  }

  generateAnimation() {
    const animations = [];

    for (let i = 1; i < this.props.positions.length; i++) {
      animations.push(Animated.timing(this.state.position, {
        toValue: {
          x: this.props.positions[i].x,
          y: this.props.positions[i].y,
        },
        duration: this.props.eventLength,
        easing: Easing.inOut(Easing.ease),
      }));
    }

    return Animated.sequence(animations);
  }

}

Player.propTypes = {
  eventLength: PropTypes.number,
  label: PropTypes.string,
  positions: PropTypes.array,
  isAnimating: PropTypes.bool,
};

const styles = StyleSheet.create({
  player: {
    position: 'absolute',
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
