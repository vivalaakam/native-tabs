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
  
  render() {
    const { toggled } = this.props;

    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        flex: 1,
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

    return (
      <View style={styles.container}>
        <TouchableHighlight style={{flex: 1}} disabled={!toggled} onPress={this.onPress}>
          <ScrollView style={{padding: 10, flex: 1}} scrollEnabled={!toggled}>
            {this.props.children}
          </ScrollView>
        </TouchableHighlight>
      </View>
    );
  }
}
