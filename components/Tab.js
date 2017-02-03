import React, { Component, PropTypes } from 'react';

import { View, Text, StyleSheet, TouchableHighlight, Dimensions, Animated, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Tab extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.animateValue = new Animated.Value(0);
  }

  animate(value, initial, to) {
    this.animateValue.setValue(initial);
    Animated.timing(
      value,
      {
        toValue: to,
        timing: 500
      }
    ).start()
  }

  forward() {
    this.animate(this.animateValue, 0, 1);
  }

  back() {
    this.animate(this.animateValue, 1, 0);
  }

  componentDidMount() {
    if (this.props.toggled === true && this.props.stamp) {
      this.forward();
    } else {
      this.back();
    }
  }

  onPress = () => {
    const { toggled, pos, setActive } = this.props;
    if (toggled) {
      setActive(pos);
    }
  };

  getAnimateValues() {
    const { stamp, active, pos, toggled } = this.props;

    if (!stamp) {
      return {
        top: 0,
        rotateX: '0deg',
        scale: 1,
        opacity: active === pos ? 1 : 0,
        zIndex: active === pos ? 1 : 0
      };
    }

    const topStart = pos > active ? height : 0;

    const top = this.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [topStart, (pos * 80)]
    });

    const rotateX = this.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-30deg']
    });

    const scale = this.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.7]
    });

    const opacity = active === pos ? 1 : this.animateValue.interpolate({
        inputRange: [0, 0.25, 1],
        outputRange: [0, 0, 1]
      });

    const zIndex = active === pos && !toggled ? 10 : 0;

    return { top, rotateX, scale, opacity, zIndex }
  }

  renderView() {
    return (
      <ScrollView style={{padding: 10}}>
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

    const { top, rotateX, scale, opacity, zIndex } = this.getAnimateValues();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: color,
        width: width,
        height: height - 57,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
      }
    });

    const view = toggled ? this.renderPressView() : this.renderView();

    return (
      <Animated.View
        style={ {position: 'absolute', flex: 1, opacity, top, zIndex, transform: [{ perspective: 600 }, { rotateX }, { scale }] }}>
        <View style={styles.container}>
          {view}
        </View>
      </Animated.View>
    );
  }
}