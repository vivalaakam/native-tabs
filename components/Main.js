import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
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

export default class Main extends Component {
  state = {
    toggled: false,
    stamp: null,
    active: 0
  };

  onToggle = () => {
    this.setState({ toggled: !this.state.toggled, stamp: +new Date() });
  };

  setActive = (active) => {
    this.setState({ active });
    this.onToggle();
  };

  renderTabs() {
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
      <View style={{flex:1}}>
        {TABS.map((tab, i) => {
          return (
            <Tab color={tab.color}
                 key={i}
                 toggled={this.state.toggled}
                 pos={i}
                 active={this.state.active}
                 stamp={this.state.stamp}
                 setActive={this.setActive}>
              <Markdown styles={styles}>{tab.content}</Markdown>
            </Tab>
          );
        })}
      </View>
    );
  }

  renderScrollTabs() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: (TABS.length + 1) * 80 , flex: 1}}>
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
        width: Dimensions.get('window').width
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