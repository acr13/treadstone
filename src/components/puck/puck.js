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

  componentWillMount() {
    // console.log('will mount');
  }

  componentWillReceiveProps(nextProps) {
    // new play
    if (nextProps.play !== this.props.play) {
      this.state.position = new Animated.ValueXY({
        x: this.props.positions[0].x,
        y: this.props.positions[0].y,
      });
    }

    this.startAnimation();
  }

  onAnimationFinish(event) {
    if (event.finished) {
      this.startAnimation();
    }
  }

  render() {
    return (
      <Animated.View style={[styles.puck, {
        top: this.state.position.x,
        left: this.state.position.y,
      }]} />
    );
  }

  generateAnimation() {
    const animations = [];

    for (let i = 0; i < this.props.positions.length; i++) {
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

  startAnimation() {
    this.state.animation = null;
    this.state.animation = this.generateAnimation();
    this.state.animation.start(); //(evt) => this.onAnimationFinish(evt));
  }

}

Puck.propTypes = {
  eventLength: PropTypes.number,
  isAnimating: PropTypes.bool,
  play: PropTypes.string,
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
