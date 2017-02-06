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
    this.rotateValue = new Animated.Value(0);

    const { pos, tHeight, first, scrolledCurr } = props;

    const delta = pos - first;
    const curr = 20 + delta * 5;
    const currS = (5 * scrolledCurr ) / tHeight;

    this.rotated = (curr + currS) / 55;

    console.log(this.rotated);

    if (this.props.toggled === true && this.props.stamp) {
      this.forward();
    } else {
      this.back();
    }
  }

  animate(value, initial, to, timing = 500) {
    value.setValue(initial);
    return Animated.timing(
      value,
      {
        toValue: to,
        timing
      }
    )
  }

  forward() {
    Animated.parallel([
      this.animate(this.animateValue, 0, 1),
      this.animate(this.rotateValue, 0, this.rotated)
    ]).start();
  }

  back() {
    Animated.parallel([
      this.animate(this.animateValue, 1, 0),
      this.animate(this.rotateValue, this.rotated, 0)
    ]).start();
  }

  onPress = () => {
    const { toggled, pos, setActive } = this.props;
    if (toggled) {
      setActive(pos);
    }
  };

  getAnimateValues() {
    const { stamp, active, pos, toggled, tHeight } = this.props;

    if (!stamp) {
      return {
        top: 0,
        rotateX: '0deg',
        scale: 1,
        opacity: active === pos ? 1 : 0,
        zIndex: active === pos ? 1 : 0,
        perspective: 600
      };
    }

    const topStart = pos > active ? height : 0;

    const top = this.animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [topStart, (pos * tHeight)]
    });

    const rotateX = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-55deg']
    });

    const perspective = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [170, 760]
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

    return { top, rotateX, scale, opacity, zIndex, perspective }
  }

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

  componentWillReceiveProps({ first, scrolledCurr }) {
    const { pos, tHeight } = this.props;
    if (pos >= first) {
      const delta = pos - first;
      const curr = 20 + delta * 5;
      const currS = (5 * scrolledCurr ) / tHeight;
      const rotated = (curr + currS) / 55;

      this.rotateValue.stopAnimation((value) => {
        const rot = Math.min(this.rotated, value);
        const timing = Math.abs(( rotated - rot ) * 100);
        this.animate(this.rotateValue, rot, rotated, timing).start(() => {
          this.rotated = rotated;
        });
      });
    }
  }

  render() {
    const { toggled, color } = this.props;

    const { top, rotateX, scale, opacity, zIndex, perspective } = this.getAnimateValues();

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
      <Animated.View
        style={ {position: 'absolute', flex: 1, opacity, top, zIndex, transform: [{ perspective }, { rotateX }, { scale }] }}>
        <View style={styles.container}>
          {view}
        </View>
      </Animated.View>
    );
  }
}
