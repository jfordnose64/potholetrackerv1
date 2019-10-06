import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import StaticMap from './Components/StaticMap'
import AddNewMarker from './Components/AddNewMarker'
import UserLocation from './Components/UserLocation'

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Pothole Tracker!</Text>
        <StaticMap />
        <UserLocation />
        <AddNewMarker />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20
  }
})
