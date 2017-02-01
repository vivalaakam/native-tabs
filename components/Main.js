import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Tab from './Tab';
import Toggle from './Toggle';

export default class Main extends Component {
  state = {
    toggled: false,
    active: 1
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
        <Tab color="#F44336" toggled={this.state.toggled} pos={0} active={this.state.active}
             setActive={this.setActive}>
          <Text>Tab1</Text>
        </Tab>
        <Tab color="#E91E63" toggled={this.state.toggled} pos={1} active={this.state.active}
             setActive={this.setActive}>
          <Text>Tab2</Text>
        </Tab>
        <Tab color="#9C27B0" toggled={this.state.toggled} pos={2} active={this.state.active}
             setActive={this.setActive}>
          <Text>Tab3</Text>
        </Tab>
        <Tab color="#673AB7" toggled={this.state.toggled} pos={3} active={this.state.active}
             setActive={this.setActive}>
          <Text>Tab4</Text>
        </Tab>
        <Tab color="#3F51B5" toggled={this.state.toggled} pos={4} active={this.state.active}
             setActive={this.setActive}>
          <Text>Tab5</Text>
        </Tab>
        <Tab color="#2196F3" toggled={this.state.toggled} pos={5} active={this.state.active}
             setActive={this.setActive}>
          <Text>Tab6</Text>
        </Tab>
        <Tab color="#03A9F4" toggled={this.state.toggled} pos={6} active={this.state.active}
             setActive={this.setActive}>
          <Text>Tab7</Text>
        </Tab>
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
        flex: 9
      },
      toggle: {
        flex: 1,
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