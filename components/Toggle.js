import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default class Toggle extends Component {
  render() {
    const styles = StyleSheet.create({
      main: {
        flex: 1
      },
      button: {
        flex: 1,
        height: 50
      }
    });

    return (
      <View style={styles.main}>
        <Button style={styles.button} onPress={this.props.onClick} title="TOGGLE" />
      </View>
    );
  }
}