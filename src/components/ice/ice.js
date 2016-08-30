import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { COLORS } from '../../styles/clrs';

const HEIGHT_ICE = 500;
const WIDTH_ICE = 345;
const DEPTH_BEHIND_NET = 45;
const HEIGHT_GOAL_LINE = 3;
const HEIGHT_BLUE_LINE = 5;
const DEPTH_ZONE = (HEIGHT_ICE - (DEPTH_BEHIND_NET * 2) - (HEIGHT_GOAL_LINE * 2) - (HEIGHT_BLUE_LINE * 2)) / 3;
const HEIGHT_CIRCLE = 80;
const CENTER_CIRCLE = 100;
const FACEOFF_DOT = 20;
const PADDING_ABOVE_TOP_CIRCLES = (DEPTH_ZONE - HEIGHT_CIRCLE) / 2;
const GUTTER = 20;

function Ice() {
  return (
    <View style={styles.ice}>
      <View style={[styles.goalLine, styles.awayGoalLine]} />
      <View style={[styles.goalLine, styles.homeGoalLine]} />

      <View style={[styles.blueLine, styles.awayBlueLine]} />
      <View style={[styles.blueLine, styles.homeBlueLine]} />

      <View style={styles.centerIceCircle} />
      <View style={styles.centerIceLine} />
      <View style={styles.centerIceDot} />

      <View style={[styles.hashCircle, styles.awayLeftHashCircle]} />
      <View style={[styles.hashCircle, styles.awayRightHashCircle]} />

      <View style={[styles.hashCircle, styles.homeLeftHashCircle]} />
      <View style={[styles.hashCircle, styles.homeRightHashCircle]} />

      <View style={[styles.faceoffCircle, styles.awayLeftHashDot]} />
      <View style={[styles.faceoffCircle, styles.awayRightHashDot]} />
      <View style={[styles.faceoffCircle, styles.homeLeftHashDot]} />
      <View style={[styles.faceoffCircle, styles.homeRightHashDot]} />
    </View>
  );
}

export default Ice;

const styles = StyleSheet.create({
  ice: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.veryLightGray,
    borderRadius: 50,
    margin: 5,
    height: HEIGHT_ICE,
    width: WIDTH_ICE,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  awayGoalLine: {
    top: DEPTH_BEHIND_NET,
  },
  homeGoalLine: {
    top: HEIGHT_ICE - HEIGHT_GOAL_LINE - DEPTH_BEHIND_NET,
  },
  goalLine: {
    height: HEIGHT_GOAL_LINE,
    alignSelf: 'stretch',
    backgroundColor: COLORS.red,
  },

  awayBlueLine: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + DEPTH_ZONE,
  },
  homeBlueLine: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + (DEPTH_ZONE * 2) + HEIGHT_BLUE_LINE,
  },
  blueLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: HEIGHT_BLUE_LINE,
    alignSelf: 'stretch',
    backgroundColor: COLORS.blue,
  },

  centerIceLine: {
    position: 'absolute',
    top: (HEIGHT_ICE / 2) - (HEIGHT_BLUE_LINE / 2),
    height: HEIGHT_BLUE_LINE,
    left: 0,
    right: 0,
    backgroundColor: COLORS.red,
  },
  centerIceCircle: {
    position: 'absolute',
    height: CENTER_CIRCLE,
    width: CENTER_CIRCLE,
    backgroundColor: COLORS.white,
    borderRadius: CENTER_CIRCLE / 2,
    borderWidth: 2,
    borderColor: COLORS.red,
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + DEPTH_ZONE + HEIGHT_BLUE_LINE + ((DEPTH_ZONE - CENTER_CIRCLE) / 2),
    left: (WIDTH_ICE - CENTER_CIRCLE) / 2,
  },
  centerIceDot: {
    position: 'absolute',
    height: FACEOFF_DOT,
    width: FACEOFF_DOT,
    borderRadius: FACEOFF_DOT / 2,
    backgroundColor: COLORS.red,
    top: (HEIGHT_ICE / 2) - (FACEOFF_DOT / 2),
    left: (WIDTH_ICE / 2) - (FACEOFF_DOT / 2),
  },

  awayLeftHashCircle: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + PADDING_ABOVE_TOP_CIRCLES,
    left: GUTTER,
  },
  awayRightHashCircle: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + PADDING_ABOVE_TOP_CIRCLES,
    right: GUTTER,
  },
  homeLeftHashCircle: {
    top: (HEIGHT_ICE - (DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + DEPTH_ZONE)) + PADDING_ABOVE_TOP_CIRCLES,
    left: GUTTER,
  },
  homeRightHashCircle: {
    top: (HEIGHT_ICE - (DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + DEPTH_ZONE)) + PADDING_ABOVE_TOP_CIRCLES,
    right: GUTTER,
  },
  hashCircle: {
    position: 'absolute',
    height: HEIGHT_CIRCLE,
    width: HEIGHT_CIRCLE,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.red,
    borderRadius: HEIGHT_CIRCLE / 2,
  },

  faceoffCircle: {
    position: 'absolute',
    height: FACEOFF_DOT,
    width: FACEOFF_DOT,
    borderRadius: FACEOFF_DOT / 2,
    backgroundColor: COLORS.red,
  },
  awayLeftHashDot: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + PADDING_ABOVE_TOP_CIRCLES + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
    left: GUTTER + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
  },
  awayRightHashDot: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + PADDING_ABOVE_TOP_CIRCLES + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
    right: GUTTER + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
  },
  homeLeftHashDot: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + (DEPTH_ZONE * 2) + (HEIGHT_BLUE_LINE * 2) + PADDING_ABOVE_TOP_CIRCLES + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
    left: GUTTER + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
  },
  homeRightHashDot: {
    top: DEPTH_BEHIND_NET + HEIGHT_GOAL_LINE + (DEPTH_ZONE * 2) + (HEIGHT_BLUE_LINE * 2) + PADDING_ABOVE_TOP_CIRCLES + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
    right: GUTTER + (HEIGHT_CIRCLE / 2) - (FACEOFF_DOT / 2),
  },
});
