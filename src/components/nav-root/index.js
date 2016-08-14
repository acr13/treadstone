import React, { Component, PropTypes } from 'react';
import {
  BackAndroid,
  NavigationExperimental,
} from 'react-native';

const { CardStack: NavigationCardStack } = NavigationExperimental;

class NavRoot extends Component {

  _handleBackAction = () => {
    this.props.popRoute();
    return true;
  }

  _handleNavigate = ({ type, route }) => {
    switch (type) {
      case 'push':
        this.props.pushRoute(route);
        return true;
      case 'back':
      case 'pop':
        return this._handleBackAction();
      default:
        return false;
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  render() {
    const { navigator, sceneRenderer } = this.props;
    return (
      <NavigationCardStack
        direction="horizontal"
        navigationState={ navigator }
        onNavigate={ this._handleNavigate }
        renderScene={ sceneRenderer } />
      );
  }

}

NavRoot.propTypes = {
  popRoute: PropTypes.func,
  pushRoute: PropTypes.func,
  navigator: PropTypes.object,
  sceneRenderer: PropTypes.func,
};

export default NavRoot;
