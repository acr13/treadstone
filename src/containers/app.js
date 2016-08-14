import React from 'react';
import { connect } from 'react-redux';
import NavRoot from '../components/nav-root';
import { push, pop } from '../actions/navigator';
import sceneRenderer from '../scene-renderer';

function App(props) {
  return <NavRoot sceneRenderer={ sceneRenderer } { ...props } />;
}

function mapStateToProps(state) {
  return {
    navigator: state.navigator,
  };
}

export default connect(
  mapStateToProps, {
    pushRoute: (route) => push(route),
    popRoute: () => pop(),
  }
)(App);
