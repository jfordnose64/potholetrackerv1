import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
// import { Button } from 'react-native-elements'
import { ScreenProps } from 'react-navigation'

class Home extends Component<ScreenProps> {
  static navigationOptions = {
    title: 'Pothole Tracker',
    headerStyle: {
      backgroundColor: '#ca3e47'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30
    }
  }

  render() {
    return (
      <ScrollView style={styles.app}>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Welcome to the Pothole Tracker</Text>
            <Text style={styles.desc}>
              The Pothole Tracker is a community driven and Opensourse app that
              helps roads get fixed faster.{' '}
            </Text>
          </View>
          <View style={styles.buttonall}>
            <View style={styles.buttoncon}>
              <Button
                style={styles.button}
                color="#ca3e47"
                title=" Check out the Map!"
                onPress={() => {
                  this.props.navigation.navigate('Map')
                }}
              />
            </View>
            <View style={styles.buttoncon}>
              <Button
                style={styles.button}
                color="#ca3e47"
                title="Add a marker!"
                onPress={() => {
                  this.props.navigation.navigate('Add')
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.carmode}>
          <Text style={styles.carheader}>Car Mode</Text>
          <Text style={styles.cardesc}>
            Car Mode uses the phones built in Gyroscope and Accelerometer to
            measure potholes in the road and the chart the Potholes on the map
          </Text>
          <Button
            title="Car Mode"
            color="#ca3e47"
            onPress={() => {
              this.props.navigation.navigate('Car')
            }}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#525252',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    margin: 20,
    borderRadius: 20
  },
  app: {
    backgroundColor: '#313131'
  },
  text: {
    fontWeight: '500',
    fontSize: 30,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    color: '#000',
    textAlign: 'center'
  },
  desc: {
    fontSize: 17.5,
    fontWeight: '400',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    padding: 20,
    margin: 20,
    color: '#82ccdd'
  },
  map: {
    fontSize: 22.5,
    fontWeight: '500',
    margin: 10
  },
  buttoncon: {
    padding: 15
  },
  buttonall: {
    display: 'flex',
    justifyContent: 'center'
  },
  carmode: {
    flex: 1,
    backgroundColor: '#525252',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    margin: 20,
    borderRadius: 20
  },
  carheader: {
    fontSize: 30,
    fontWeight: '500'
    // paddingBottom: 10
  },
  cardesc: {
    padding: 10,
    fontSize: 20,
    fontWeight: '400',
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center'
  }
})

export default Home
