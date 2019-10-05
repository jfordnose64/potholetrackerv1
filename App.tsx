import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StaticMap from './Components/StaticMap'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pothole Tracker!</Text>
      <StaticMap />
    </View>
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
