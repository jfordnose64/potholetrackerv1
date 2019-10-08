import React, { Component } from 'react'
import Axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

interface IMarker {
  id: any
  latitude: any
  longitude: any
}

interface MyProps {}

interface MyState {
  markers: IMarker[]
  isMapReady: Boolean
  addMarker: IMarker | null
  markerDraggable: IMarker[]
  showMarker: Boolean
}

class HomePage extends Component<MyProps, MyState> {
  constructor(props) {
    super(props)
    this.state = {
      isMapReady: false,
      addMarker: null,
      markers: [],
      markerDraggable: [],
      showMarker: false
    }
  }
  onMapLayout = () => {
    this.setState({ isMapReady: true })
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
            latitude: 27.78825,
            longitude: -82.6324,
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
                  <Button title="Add a thing" />
                </View>
              </Callout>
            </Marker>
          ) : null}
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
      width: 400,
      height: 600,
      borderRadius: 5,
      marginTop: 15,
      marginBottom: 15
    }
  })
}

export default HomePage
