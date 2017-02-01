import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class Toggle extends Component {
  render() {
    const styles = StyleSheet.create({
      main: {
        flex: 1
      }
    });

    return (
      <View style={styles.main}>
        <Button onPress={this.props.onClick} title="Bottom" />
      </View>
    );
  }
}