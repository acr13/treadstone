import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
} from 'react-native';
import Net from '../../components/net';

import { jumpTo } from '../../actions/navigator';
import { SCENES } from '../../constants';
import { COLORS } from '../../styles/clrs';

function Home() {
  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Net />
      </View>
      <View style={styles.bottomBar} />
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
  content: {
    flex: 1,
  },
  bottomBar: {
    height: 75,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
});
