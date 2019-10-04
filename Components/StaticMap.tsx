import React, { Component } from 'react'
import Axios from 'axios'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

interface Marker {}

interface MyProps {}

interface MyState {
  markers: object[]
  isMapReady: Boolean
}

class HomePage extends Component<MyProps, MyState> {
  constructor(props) {
    super(props)
    this.state = {
      isMapReady: false,
      markers: [
        // {
        //   title: 'something 1',
        //   latitude: 27.87094,
        //   longitude: -82.76351,
        //   id: 1
        // }
      ]
    }
  }
  onMapLayout = () => {
    this.setState({ isMapReady: true })
  }

  fetchPotholes = async () => {
    const resp = await Axios.get('https://localhost:5001/api/Pothole')
    this.setState({
      markers: resp.data
    })
    console.log('wow')
  }

  componentDidMount() {
    this.fetchPotholes()
  }

  render() {
    return (
      <View>
        <Text>Wow</Text>
        <MapView
          style={this.styles.map}
          initialRegion={{
            latitude: 27.78825,
            longitude: -82.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
            >
              <Text>11</Text>
            </Marker>
          ))}
        </MapView>
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
      width: 250,
      height: 250
    }
  })
}

export default HomePage
