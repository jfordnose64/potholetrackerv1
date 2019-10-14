import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import StaticMap from './StaticMap'
import { ScreenProps } from 'react-navigation'

export default class Map extends React.Component<ScreenProps> {
  static navigationOptions = {
    title: 'Pothole Tracker',
    headerStyle: {
      backgroundColor: '95adbe'
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StaticMap />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
