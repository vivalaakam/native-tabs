import React, { Component, PropTypes } from 'react';

import { View, Text, StyleSheet, TouchableHighlight, Dimensions, Animated, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Tab extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  onPress = () => {
    const { toggled, pos, setActive } = this.props;
    if (toggled) {
      setActive(pos);
    }
  };

  renderView() {
    return (
      <ScrollView style={{padding: 10, flex: 1}}>
        {this.props.children}
      </ScrollView>);
  }

  renderPressView() {
    return (
      <TouchableHighlight style={{flex: 1}} onPress={this.onPress}>
        {this.renderView()}
      </TouchableHighlight>
    );
  }

  render() {
    const { toggled, color } = this.props;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: color,
        width: width,
        height: height - 57,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
      }
    });

    const view = toggled ? this.renderPressView() : this.renderView();

    return (
      <View style={styles.container}>
        {view}
      </View>
    );
  }
}
