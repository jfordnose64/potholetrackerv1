import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { ScreenProps } from 'react-navigation'
import UserLocation from './UserLocation'
import AddNewMarker from './AddNewMarker'
import Sensors from './Sensors'

class Add extends Component<ScreenProps> {
  static navigationOptions = {
    title: 'Add Marker',
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
      <ScrollView style={styles.all}>
        <View style={styles.container}>
          <UserLocation />
          <AddNewMarker />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#313131'
  },
  all: {
    backgroundColor: '#313131'
  }
})

export default Add
