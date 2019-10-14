import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { ScreenProps } from 'react-navigation'
import Sensors from './Sensors'

class Car extends Component<ScreenProps> {
  static navigationOptions = {
    title: 'Car Mode',
    headerStyle: {
      backgroundColor: '#ca3e47'
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30
    }
  }

  render() {
    return (
      <ScrollView style={styles.app}>
        <View style={styles.container}>
          <Sensors />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313131'
  },
  app: {
    backgroundColor: '#313131'
  }
})

export default Car
