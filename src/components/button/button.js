import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { COLORS } from '../../styles/clrs';

function Button(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
      <View>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  text: {
    color: COLORS.royalBlue,
  },
});
