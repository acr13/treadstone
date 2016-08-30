import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
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

import Ice from '../ice/ice';

function PowerPlay(props) {
  return (
    <View>
      <Ice />
      <Puck positions={PUCK} eventLength={props.eventLength} />
      <Player label={'LW'} positions={LW} eventLength={props.eventLength} />
      <Player label={'C'} positions={C} eventLength={props.eventLength} />
      <Player label={'RW'} positions={RW} eventLength={props.eventLength} />
      <Player label={'LD'} positions={LD} eventLength={props.eventLength} />
      <Player label={'RD'} positions={RD} eventLength={props.eventLength} />

      <View style={styles.buttonBar}>
        <Button text={'Breakout 1'}
          onPress={() => 1}
        />
        <Button text={'Breakout 2'}
          onPress={() => 1}
        />
        <Button text={'Breakout 3'}
          onPress={() => 1}
        />
      </View>
    </View>
  );
}

PowerPlay.propTypes = {
  eventLength: PropTypes.number,
};

export default PowerPlay;

const styles = StyleSheet.create({
  buttonBar: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
