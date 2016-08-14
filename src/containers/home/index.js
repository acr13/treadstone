import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { jumpTo } from '../../actions/navigator';
import { SCENES } from '../../constants';
import { COLORS } from '../../styles/clrs';

function Home({ goToNextPageAction }) {
  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Text>{'Home Page'}</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => goToNextPageAction()}
          style={styles.button}
        >
          <Text style={styles.text}>{'Go'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Home.propTypes = {
  goToNextPageAction: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    goToNextPageAction: () => dispatch(jumpTo({ key: SCENES.SCENE_TWO })),
  };
}

export default connect(
  () => ({}), mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    height: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: COLORS.gray,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
});
