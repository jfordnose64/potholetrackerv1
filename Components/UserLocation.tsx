import React, { Component } from 'react'
import Axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native'

class UserLocation extends Component {
  state = {
    userLocation: {
      lat: 34.2333,
      long: 34.545
    }
  }

  addMarkerOnUserLocation = async () => {
    const url = 'http://10.0.2.2:500/api/Pothole'
    const resp = await Axios.post(url, {
      latitude: this.state.userLocation.lat,
      longitude: this.state.userLocation.long
    })
    console.log('worked')
  }

  componentDidMount() {
    this.setLocationState()
    console.log(this.state.userLocation.lat)
  }

  setLocationState = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      this.setState({
        userLocation: setUserLocation
      })
    })
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>Your Location</Text>
        <View style={styles.coordinateCont}>
          <Text style={styles.coordinates}>
            Latitude: {this.state.userLocation.lat}
          </Text>
          <Text style={styles.coordinates}>
            Longitude: {this.state.userLocation.long}
          </Text>
        </View>
        <Button
          // onPress={() => this.addMarkerOnUserLocation()}
          title="Add Marker on your location"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },
  coordinates: {
    fontSize: 15,
    fontWeight: '400'
  },
  coordinateCont: {
    marginTop: 10,
    marginBottom: 10
  }
})

export default UserLocation
