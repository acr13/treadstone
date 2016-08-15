import React from 'react';
import { View, Text } from 'react-native';
import * as R from 'ramda';
import Home from '../containers/home/';

import { SCENES } from '../constants';

const App404 = () => (
  <View>
    <Text>Navigation State Not Found</Text>
  </View>
);

const getScene = R.cond([
  [R.equals(SCENES.HOME), () => <Home />],
  [R.T(), R.always(<App404 />)],
]);

const sceneRenderer = R.compose(
  getScene,
  R.replace(/^scene_/, ''),
  R.path(['scene', 'key']),
);

export default sceneRenderer;
