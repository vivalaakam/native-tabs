import React, { Component, PropTypes } from 'react';

import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';

export default class Tab extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  render() {
    const { color, active, toggled, pos, setActive } = this.props;

    const styles = StyleSheet.create({
      main: {
        backgroundColor: color,
        position: 'absolute',
        top: 0,
        flex: 1,
        opacity: active === pos || toggled ? 1 : 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
      },
      toggled: {
        top: 20 + (pos * 80),
        transform: [
          {
            scaleX: 0.7,
            scaleY: 0.7
          },
          {
            perspective: 600
          },
          {
            rotateX: '-30deg'
          }
        ]
      },
      touchable: {
        flex: 1
      }
    });

    const main = toggled ? StyleSheet.flatten([styles.main, styles.toggled]) : StyleSheet.flatten([styles.main]);

    const onPress = () => {
      if (toggled) {
        setActive(pos);
      }
    };

    return (
      <View style={main}>
        <TouchableHighlight style={styles.touchable} onPress={onPress}>
          {this.props.children}
        </TouchableHighlight>
      </View>
    );
  }
}