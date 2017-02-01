import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Tab from './Tab';
import Toggle from './Toggle';

const TABS = [
  { content: 'Tab1', color: '#F44336' },
  { content: 'Tab2', color: '#E91E63' },
  { content: 'Tab3', color: '#9C27B0' },
  { content: 'Tab4', color: '#673AB7' },
  { content: 'Tab5', color: '#3F51B5' },
  { content: 'Tab6', color: '#2196F3' },
  { content: 'Tab7', color: '#03A9F4' }
];

export default class Main extends Component {
  state = {
    toggled: false,
    active: 0
  };

  onToggle = () => {
    this.setState({ toggled: !this.state.toggled });
  };

  setActive = (active) => {
    this.setState({ active });
    this.onToggle();
  };

  renderTabs() {
    return (
      <View style={{flex:1}}>
        {TABS.map((tab, i) => {
          return (
            <Tab color={tab.color}
                 key={i}
                 toggled={this.state.toggled}
                 pos={i}
                 active={this.state.active}
                 setActive={this.setActive}>
              <Text>{tab.content}</Text>
            </Tab>
          );
        })}
      </View>
    );
  }

  renderScrollTabs() {
    return (
      <ScrollView>
        {this.renderTabs()}
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
        flexBasis: 50,
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
          <Toggle onClick={this.onToggle} />
        </View>
      </View>
    );
  }
}