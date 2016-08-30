import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../styles/clrs';

function Button(props) {
  const textStyle = getTextColor(props.disabled);

  return (
    <TouchableOpacity style={styles.button}
      onPress={() => props.onPress()}
      disabled={props.disabled}
    >
      <View>
        <Text style={[styles.text, textStyle]}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

function getTextColor(disabled) {
  return {
    color: disabled ? COLORS.gray : COLORS.royalBlue,
  };
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  text: PropTypes.string,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.royalBlue,
  },
});
