import React, { Component } from 'react'
import Axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native'

class UserLocation extends Component {
  state = {
    userLocation: {
      lat: 34.2333,
      long: 34.545
    },
    address: '123'
  }

  addMarkerOnUserLocation = async () => {
    const url = 'http://10.0.2.2:500/api/Pothole'
    const resp = await Axios.post(url, {
      latitude: this.state.userLocation.lat,
      longitude: this.state.userLocation.long
    })
    console.log('worked')
  }

  convertLatLong = async () => {
    const url =
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCqif8ZjnUKRfHM9S36U5ZnzkCDqbpVzFI'
    const resp = await Axios.get(url)
    this.setState({
      address: resp.data.result
    })
  }

  componentDidMount() {
    this.setLocationState()
    this.convertLatLong()
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
      <View style={styles.container}>
        <Text style={styles.header}>Your Location</Text>
        <View style={styles.coordinateCont}>
          <Text style={styles.coordinates}>
            Latitude: {this.state.userLocation.lat}
          </Text>
          <Text style={styles.coordinates}>
            Longitude: {this.state.userLocation.long}
          </Text>
          <Text style={styles.coordinates}>Address: {this.state.address}</Text>
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
    fontWeight: '400',
    paddingTop: 10,
    paddingBottom: 10
  },
  coordinateCont: {
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    backgroundColor: '#e9e7e7',
    padding: 15,
    borderRadius: 7,
    width: 350,
    alignItems: 'center'
  }
})

export default UserLocation
