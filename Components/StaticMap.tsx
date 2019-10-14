import React, { Component } from 'react'
import Axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

interface IMarker {
  id: any
  latitude: any
  longitude: any
}

interface UserMarker {
  lat: any
  long: any
}

interface MyProps {}

interface MyState {
  markers: IMarker[]
  isMapReady: Boolean
  addMarker: IMarker | null
  markerDraggable: IMarker[]
  showMarker: Boolean
  userLocation: UserMarker
}

class HomePage extends Component<MyProps, MyState> {
  constructor(props) {
    super(props)
    this.state = {
      isMapReady: false,
      addMarker: null,
      markers: [],
      markerDraggable: [],
      showMarker: false,
      userLocation: {
        lat: 34.45,
        long: 34
      }
    }
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true })
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

  fetchPotholes = async () => {
    const url = 'http://10.0.2.2:5000/api/Pothole'
    console.log('wow', url)
    Axios.get(url)
      .then(resp => {
        this.setState({
          markers: resp.data
        })
      })
      .catch(ex => console.log('error', { ex }))
    this.setLocationState()
  }

  addPotholes = async e => {
    const url = 'http://10.0.2.2:5000/api/Pothole'
    console.log('Submitted')
    const resp = await Axios.post(url, {
      latitude: this.state.addMarker.latitude,
      longitude: this.state.addMarker.longitude
    })
    // console.log(resp.data)
  }

  onMapPress = e => {
    this.setState({
      showMarker: true,
      addMarker: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        id: 0
      }
    })
  }

  componentDidMount() {
    this.fetchPotholes()
  }

  render() {
    return (
      <View>
        <MapView
          style={this.styles.map}
          initialRegion={{
            latitude: 27.7708,
            longitude: -82.663,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          // Fix Me!!! e.nativeEvent undefined is not an object
          onPress={e => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              pinColor="red"
              title="Pothole"
            >
              <Callout>
                <View>
                  <Text>Latitude: {marker.latitude}</Text>
                  <Text>Longitude: {marker.longitude}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
          {this.state.showMarker == true ? (
            <Marker
              coordinate={{
                latitude: this.state.addMarker.latitude,
                longitude: this.state.addMarker.longitude
              }}
            >
              <Callout onPress={e => this.addPotholes(e)}>
                <View>
                  <Button title="Add a New Marker" />
                </View>
              </Callout>
            </Marker>
          ) : null}
          <Marker
            coordinate={{
              latitude: this.state.userLocation.lat,
              longitude: this.state.userLocation.long
            }}
            pinColor="blue"
            title="User Location"
          ></Marker>
        </MapView>
        <View></View>
      </View>
    )
  }
  styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    scrollview: {
      alignItems: 'center',
      paddingVertical: 40
    },
    map: {
      width: 415,
      height: 820,
      borderRadius: 5,
      marginTop: 15,
      marginBottom: 15
    }
  })
}

export default HomePage
