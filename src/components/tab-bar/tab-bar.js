import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../styles/clrs';

const FacebookTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    style: React.PropTypes.object,
    tabIcons: React.PropTypes.array,
    tabs: React.PropTypes.array,
    tabNames: React.PropTypes.array,
  },

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  getTextColor(idx) {
    return {
      color: this.props.activeTab === idx ? COLORS.royalBlue : COLORS.gray,
    };
  },

  // color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    return (
      <View style={[styles.tabs, this.props.style ]}>
        {this.props.tabs.map((tab, i) => {
          return (
              <TouchableOpacity key={tab}
                onPress={() => this.props.goToPage(i)} style={styles.tab}>
                <Icon
                  name={tab}
                  size={30}
                  color={this.props.activeTab === i ? COLORS.royalBlue : COLORS.gray}
                  ref={(icon) => { this.tabIcons[i] = icon; }}
                />
              <Text style={[styles.text, this.getTextColor(i)]}>{this.props.tabNames[i]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },

  setAnimationValue({ value }) {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  },

  tabIcons: [],
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: COLORS.veryLightGray,
    backgroundColor: COLORS.white,
  },
  text: {
    fontSize: 11,
    color: COLORS.gray,
  },
});

export default FacebookTabBar;
