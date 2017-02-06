import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import Tab from './Tab';
import TABS from './Tabs';
import Toggle from './Toggle';

const { width, height } = Dimensions.get('window');

const HEIGHT = height - 38;
const HEIGHT_CELL = HEIGHT / 5;
const START = 20;
const PERCENTS = 7;
const FINISH = START + PERCENTS * 7;

export default class Main extends Component {
  state = {
    toggled: false,
    active: 0
  };

  constructor(props) {
    super(props);

    this.rotated = 0;
    this.first = 0;

    this.animates = TABS.map((tab, i) => ({
      animateValue: new Animated.Value(0),
      rotateValue: new Animated.Value(0),
      opacityValue: new Animated.Value(1)
    }));

    this.tabs = TABS.map((tab, i) => this.getAnimateValues(i, this.state.active));
  }

  scrollRef = (ref) => {
    this._scroll = ref;
  };

  onToggle = () => {
    this.setState({ toggled: !this.state.toggled }, () => {
      if (this.state.toggled === true) {
        this.forward();
      } else {
        this.back();
      }
    });
  };

  setActive = (active) => {
    this.tabs = TABS.map((tab, i) => this.getAnimateValues(i, active));
    this.setState({ active, toggled: !this.state.toggled, first: -1 }, () => {
      if (this.state.toggled === true) {
        this.forward();
      } else {
        this.back();
      }
    });
  };

  handleScroll = (event) => {
    if (this.state.toggled) {
      const scrolled = event.nativeEvent.contentOffset.y;
      const first = Math.floor(scrolled / HEIGHT_CELL);
      const scrolledCurr = scrolled % HEIGHT_CELL;

      const currS = (PERCENTS * scrolledCurr ) / HEIGHT_CELL;
      this.first = first;
      this.animateTab(currS / FINISH);
    }
  };

  animateTab(cRotated) {
    const animates = this.animates.map((animate, i) => {
      return new Promise((resolve) => {
        animate.rotateValue.stopAnimation((value) => {
          const delta = i - this.first;
          const curr = delta < 0 ? START : START + delta * PERCENTS;
          const rotated = curr / FINISH + cRotated;
          const rot = Math.min(curr / FINISH + this.rotated, value);
          const timing = Math.abs(( rotated - rot ) * 100);
          resolve(this.animate(animate.rotateValue, rot, rotated, timing));
        });
      });
    });

    Promise.all(animates).then((animates) => {
      Animated.parallel(animates).start(() => {
        this.rotated = cRotated;
      });
    })
  }

  getAnimateValues(pos, active) {
    const topStart = pos > active ? height : 0;
    const top = this.animates[pos].animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [topStart, (pos * HEIGHT_CELL)]
    });

    const rotateX = this.animates[pos].rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', `-${FINISH}deg`]
    });

    const perspective = this.animates[pos].rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [170, 760]
    });

    const scale = this.animates[pos].animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.7]
    });

    const opacity = this.animates[pos].opacityValue.interpolate({
      inputRange: [0, 0.25, 1],
      outputRange: [0, 0, 1]
    });

    return { top, rotateX, scale, opacity, perspective }
  }

  animate(value, initial, toValue, timing = 500) {
    value.setValue(initial);
    return Animated.timing(value, { toValue, timing });
  }

  forward() {
    const { active } = this.state;
    const animations = this.animates.reduce((state, curr, i) => {
      const delta = Math.max(i - this.first, 0);
      const currP = START + delta * PERCENTS;
      const rotated = currP / FINISH + this.rotated;
      const zIndex = active === i ? 1 : 0;

      state.push(
        this.animate(curr.animateValue, 0, 1),
        this.animate(curr.rotateValue, 0, rotated),
        this.animate(curr.opacityValue, zIndex, 1)
      );
      return state;
    }, []);

    Animated.parallel(animations).start();
  }

  back() {
    const { active } = this.state;
    const animations = this.animates.reduce((state, curr, i) => {
      const delta = Math.max(i - this.first, 0);
      const currP = START + delta * PERCENTS;
      const rotated = currP / FINISH + this.rotated;
      const zIndex = active === i ? 1 : 0;

      state.push(
        this.animate(curr.animateValue, 1, 0),
        this.animate(curr.rotateValue, rotated, 0),
        this.animate(curr.opacityValue, 1, zIndex)
      );

      return state;
    }, []);

    Animated.parallel(animations).start(() => {
      this._scroll.scrollTo({ y: 0, animated: true });
    });
  }

  renderTabs() {
    const { active, toggled } = this.state;

    return TABS.map((tab, i) => {
      const { top, rotateX, scale, opacity, perspective } = this.tabs[i];
      const zIndex = active === i || toggled ? 1 : 0;
      const style = {
        position: 'absolute',
        flex: 1,
        opacity,
        top,
        zIndex,
        transform: [{ perspective }, { rotateX }, { scale }]
      };
      return (
        <Animated.View
          style={style}
          key={i}>
          <Tab toggled={toggled}
               pos={i}
               setActive={this.setActive}>
            {tab.content()}
          </Tab>
        </Animated.View>
      );
    });
  }

  render() {
    const styles = StyleSheet.create({
      main: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingTop: 20,
        width,
        backgroundColor: 'rgba(0 ,0,0, .3)'
      },
      tabs: {
        flex: 1
      },
      toggle: {
        flexBasis: 38,
        backgroundColor: '#8BC34A'
      }
    });

    const { toggled } = this.state;
    const height = toggled ? (TABS.length + 1) * HEIGHT_CELL : HEIGHT;

    return (
      <View style={styles.main}>
        <View style={styles.tabs}>
          <ScrollView style={{flex: 1}}
                      scrollEnabled={toggled}
                      ref={this.scrollRef}
                      onScroll={this.handleScroll}
                      scrollEventThrottle={16}>
            <View style={{height}}>
              {this.renderTabs()}
            </View>
          </ScrollView>
        </View>
        <View style={styles.toggle}>
          <Toggle toggled={this.state.toggled} onClick={this.onToggle} />
        </View>
      </View>
    );
  }
}
