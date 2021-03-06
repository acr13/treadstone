import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { List } from 'immutable';
import Ice from '../ice/ice';
import Player from '../player/player';
import Puck from '../puck/puck';
import Button from '../button/button';
import {
  LW,
  C,
  RW,
  LD,
  RD,
  PUCK,
} from '../../plays/breakouts/breakout1';

function Breakout(props) {
  return (
    <View>
      <Ice />

      <Puck positions={PUCK}
        eventLength={props.eventLength}
        play={props.play}
        isAnimating={props.isBreakoutAnimating}
      />
      <Player label={'LW'}
        positions={LW}
        eventLength={props.eventLength}
        play={props.play}
        isAnimating={props.isBreakoutAnimating}
      />
      <Player label={'C'}
        positions={C}
        eventLength={props.eventLength}
        play={props.play}
        isAnimating={props.isBreakoutAnimating}
      />
      <Player label={'RW'}
        positions={RW}
        eventLength={props.eventLength}
        play={props.play}
        isAnimating={props.isBreakoutAnimating}
      />
      <Player label={'LD'}
        positions={LD}
        eventLength={props.eventLength}
        play={props.play}
        isAnimating={props.isBreakoutAnimating}
      />
      <Player label={'RD'}
        positions={RD}
        eventLength={props.eventLength}
        play={props.play}
        isAnimating={props.isBreakoutAnimating}
      />

      <View style={styles.buttonBar}>
        {props.plays.map((play) => {
          return (
            <Button text={'Breakout ' + play}
              key={play}
              onPress={() => props.actionSwitchBreakout(play)}
            />
          );
        })}
      </View>
    </View>
  );
}

// props.isBreakoutAnimating && props.breakoutPlay === play ? false : true}

Breakout.propTypes = {
  actionSwitchBreakout: PropTypes.func,
  eventLength: PropTypes.number,
  isBreakoutAnimating: PropTypes.bool,
  play: PropTypes.string,
  plays: PropTypes.instanceOf(List),
};

export default Breakout;

const styles = StyleSheet.create({
  buttonBar: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
