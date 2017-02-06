import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import Markdown from 'react-native-simple-markdown';
import Tab from './Tab';
import Toggle from './Toggle';

const TABS = [
  {
    content: `
Lorem ipsum dolor sit amet, vis id tollit decore. Pri nisl mollis ei, commodo voluptua complectitur at sit. Te cibo dissentias vix. Eos liber luptatum ad. Et ubique expetenda assueverit pri, eam lucilius omittantur an, his ad facilisi periculis.

Et vim solum repudiandae, oblique petentium eam eu. Eam et volutpat mediocritatem, nec novum melius aperiam ex, et ius perpetua repudiare. No usu viderer veritus, ad his alia summo. In vitae animal ius. Volumus ponderum per ne.

Velit affert option vis et, ut vix agam salutatus, sed aeterno explicari argumentum te. Nostro audire virtute pri id, ei ignota timeam sed. Ut wisi putant mea, cu suas tation ius, id tamquam laoreet aliquando vis. Hinc partem periculis duo no, pro ad quando graece instructior. Est veniam civibus ex. Malis dicat inani at cum, salutandi gloriatur mea cu, rebum salutandi reformidans no quo. No has vivendo neglegentur, nam in omnium virtute, sed ut diam duis viris.

Vix an mazim nostro, eam graeci tincidunt maiestatis no. Ut eirmod timeam ornatus has, te per delicata maluisset liberavisse, alterum molestiae cu eam. An noluisse salutandi consequat vel. Cu quot fuisset complectitur mel. Ei nec illud graeco, at duo odio debet congue, audire scripta vel ut. Eum quaeque disputationi at, nam te clita dolores, tritani sensibus scribentur ius in.

Ei falli legere regione vel. Homero populo duo ad. Ut possim iudicabit per, vix ea accusata atomorum. Quando partem euismod ei est, has ut commodo sanctus. Numquam labores vix ex, quo ut periculis torquatos. Ut nam reque causae civibus, pro te augue sensibus urbanitas. Accumsan ponderum ut has.\n Eirmod eripuit deserunt no vis, eum assum dissentias accommodare ad. Qui at altera partiendo iracundia, et eos postea causae omnesque. Ut veri lobortis sapientem eam, ut aeterno deleniti mei, sed ut luptatum ocurreret prodesset. At usu nisl invenire scripserit. Vim feugiat ponderum invenire ut, dolor delectus sea id.

Usu eius epicuri vituperatoribus et. Eam in perpetua dissentiet, iuvaret delenit ea per. His no suas apeirian, sed ad iudico veniam. Nam altera oporteat pertinacia ea, ad cum etiam utinam consequat, mel et doming dignissim. Porro volutpat percipitur vel at. \n Adipisci salutandi mei ex. Ei ius graeco fierent suscipiantur, ne nonumy imperdiet sed. Tantas invidunt adipisci pri ut. Iriure viderer has ad. Ut sit dolorum deseruisse conclusionemque, nam alterum offendit praesent at. Ea audiam argumentum cum, ius magna ponderum accusata eu.`,
    color: '#F44336'
  },
  {
    content: `Some *really* basic **Markdown**.
| # | Name   | Age |
|---|--------|-----|
| 1 | John   | 19  |
| 2 | Sally  | 18  |
| 3 | Stream | 20  |`,
    color: '#E91E63'
  },
  {
    content: `
#Markdown in react-native is so cool!

You can **emphasize** what you want, or just _suggest it_ ðâ¦

You can even [link your website](http://charlesmangwa.surge.sh) or if you prefer: [email somebody](mailto:email@somebody.com) 

Spice it up with some GIF ð:

![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif) 

And even add a cool video ð!

[![A cool video from YT](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ) 

[![Another one from Vimeo](https://i.vimeocdn.com/video/399486266_640.jpg)](https://vimeo.com/57580368)`,
    color: '#9C27B0'
  },
  { content: 'Tab4', color: '#673AB7' },
  { content: 'Tab5', color: '#3F51B5' },
  { content: 'Tab6', color: '#2196F3' },
  { content: 'Tab7', color: '#03A9F4' }
];

const { width, height } = Dimensions.get('window');

const tHeight = ( height - 38 ) / 5;

export default class Main extends Component {
  state = {
    toggled: false,
    first: 0,
    active: 0
  };

  constructor(props) {
    super(props);

    this.rotated = 0;

    this.animates = TABS.map((tab, i) => ({
      animateValue: new Animated.Value(0),
      rotateValue: new Animated.Value(0),
      opacityValue: new Animated.Value(1)
    }));

    this.tabs = TABS.map((tab, i) => this.getAnimateValues(i));
  }

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
    this.setState({ active, toggled: !this.state.toggled }, () => {
      if (this.state.toggled === true) {
        this.forward();
      } else {
        this.back();
      }
    });
  };

  handleScroll = (event) => {
    const scrolled = event.nativeEvent.contentOffset.y;
    const first = Math.floor(scrolled / tHeight);
    const scrolledCurr = scrolled % tHeight;

    const currS = (5 * scrolledCurr ) / tHeight;
    if (first !== this.state.first) {
      this.setState({ first });
    }
    this.animateTab(first, currS / 55);
  };

  animateTab(first, cRotated) {
    const animates = this.animates.map((animate, i) => {
      return new Promise((resolve) => {
        animate.rotateValue.stopAnimation((value) => {
          const delta = i - first;
          const curr = delta < 0 ? 20 : 20 + delta * 5;
          const rotated = curr / 55 + cRotated;
          const rot = Math.min(curr / 55 + this.rotated, value);
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

  getAnimateValues(pos) {
    const { active } = this.state;

    const topStart = pos > active ? height : 0;

    const top = this.animates[pos].animateValue.interpolate({
      inputRange: [0, 1],
      outputRange: [topStart, (pos * tHeight)]
    });

    const rotateX = this.animates[pos].rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-55deg']
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
    const { active, first } = this.state;
    const animations = this.animates.reduce((state, curr, i) => {
      const delta = i - first;
      const currP = 20 + delta * 5;
      const rotated = currP / 55 + this.rotated;
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
    const { active, first } = this.state;
    const animations = this.animates.reduce((state, curr, i) => {
      const delta = i - first;
      const currP = 20 + delta * 5;
      const rotated = currP / 55 + this.rotated;
      const zIndex = active === i ? 1 : 0;

      state.push(
        this.animate(curr.animateValue, 1, 0),
        this.animate(curr.rotateValue, rotated, 0),
        this.animate(curr.opacityValue, 1, zIndex)
      );

      return state;
    }, []);

    Animated.parallel(animations).start();
  }

  renderTabs() {
    const { active, toggled } = this.state;

    const styles = {
      heading1: {
        fontSize: 22,
      },
      strong: {
        fontSize: 18,
      },
      paragraph: {
        fontSize: 14,
      }
    };

    return (
      <View style={{flex:1, zIndex: 0}}>
        {TABS.map((tab, i) => {
          const { top, rotateX, scale, opacity, perspective } = this.getAnimateValues(i);
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
              key={Math.random()}>
              <Tab color={tab.color}
                   toggled={toggled}
                   pos={i}
                   setActive={this.setActive}>
                <Markdown styles={styles}>{tab.content}</Markdown>
              </Tab>
            </Animated.View>
          );
        })}
      </View>
    );
  }

  renderScrollTabs() {
    return (
      <ScrollView style={{flex: 1}} onScroll={this.handleScroll} scrollEventThrottle={16}>
        <View style={{height: (TABS.length + 1) * tHeight }}>
          {this.renderTabs()}
        </View>
      </ScrollView>
    )
  }

  render() {
    const styles = StyleSheet.create({
      main: {
        position: 'relative',
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'stretch',
        width
      },
      tabs: {
        flex: 1
      },
      toggle: {
        flexBasis: 38,
        backgroundColor: '#8BC34A'
      }
    });

    const tabs = this.state.toggled ? this.renderScrollTabs() : this.renderTabs();

    return (
      <View style={styles.main}>
        <View style={styles.tabs}>
          {tabs}
        </View>
        <View style={styles.toggle}>
          <Toggle toggled={this.state.toggled} onClick={this.onToggle} />
        </View>
      </View>
    );
  }
}
