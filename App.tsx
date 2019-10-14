import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { handleNavigationChange } from 'react-navigation-stack'
import AppNavigator from './Components/AppNavigator'

class App extends Component {
  render() {
    return (
      <>
        <AppNavigator
          onNavigationStateChange={handleNavigationChange}
          uriPrefix="/app"
        />
      </>
    )
  }
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
    margin: 20,
    backgroundColor: '#e9e7e7',
    width: 425,
    alignItems: 'center',
    padding: 15,
    color: 'black'
  }
})

export default App
