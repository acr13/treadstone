import React, { PropTypes } from 'react';
import {
  Picker,
  StyleSheet,
  View,
} from 'react-native';

import { COLORS } from '../../styles/clrs';

function Settings(props) {
  return (
    <View>
      <View style={styles.row}>
        <Picker
          selectedValue={props.selectedTeam}
          onValueChange={(team) => props.actionSwitchTeam(team)}
        >
          <Picker.Item label="Toronto Maple Leafs" value={10}/>
          <Picker.Item label="Boston Bruins" value={6}/>
          <Picker.Item label="Detroit Red Wings" value={17}/>
        </Picker>
      </View>
    </View>
  );
}

export default Settings;

Settings.propTypes = {
  actionSwitchTeam: PropTypes.func,
  selectedTeam: PropTypes.number,
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: COLORS.veryLightGray,
    marginTop: 20,
    padding: 15,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
