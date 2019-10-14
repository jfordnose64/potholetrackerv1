import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Switch,
  Button
} from 'react-native'
import { Accelerometer, Gyroscope } from 'expo-sensors'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
// import { Button } from 'react-native-elements'
import Axios from 'axios'

class Sensors extends Component {
  state = {
    accelerometerData: {},
    gyroscopeData: {},
    isFalse: false,
    userLocation: {
      lat: 34.2333,
      long: 34.545
    }
  }

  componentDidMount() {
    this._toggle()
    this.toggle()
  }

  setLocationState = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      this.setState({
        userLocation: setUserLocation,
        isFalse: true
      })
    })
  }

  startCarMode = () => {
    var timer = setInterval(() => {
      this.pothole()
    }, 1000)
  }

  componentWillUnmount() {
    this._unsubscribe()
    this.unsubscribe()
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe()
    } else {
      this._subscribe()
    }
  }

  toggle = () => {
    if (this.subscription) {
      this.unsubscribe()
    } else {
      this.subscribe()
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(1000)
  }
  slow = () => {
    Gyroscope.setUpdateInterval(1000)
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(16)
  }

  fast = () => {
    Gyroscope.setUpdateInterval(500)
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      console.log(accelerometerData, 'Accelerometer')
      this.setState({ accelerometerData })
    })
  }

  subscribe = () => {
    this.subscription = Gyroscope.addListener(result => {
      console.log(result, 'Gyroscope')
      this.setState({ gyroscopeData: result })
    })
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove()
    this._subscription = null
  }

  unsubscribe = () => {
    this.subscription && this.subscription.remove()
    this.subscription = null
  }

  pothole = () => {
    if (
      this.state.accelerometerData.x <= 0.2 &&
      this.state.gyroscopeData.x >= 0.5
    ) {
      this.setLocationState()
      console.log('Enough')
    } else {
      console.log('more')
    }
  }

  addMarkerOnUserLocation = async e => {
    const url = 'http://10.0.2.2:5000/api/Pothole'
    const resp = await Axios.post(url, {
      latitude: this.state.userLocation.lat,
      longitude: this.state.userLocation.long
    })
    console.log('worked')
  }

  render() {
    let { x, y, z } = this.state.accelerometerData

    return (
      <View style={styles.all}>
        <View style={styles.conmain}>
          <Text style={styles.beta}>BETA</Text>
          <Text style={styles.carmode}>Pothole Tracker Car Mode</Text>
          <Button
            style={styles.buttonone}
            title="CarMode"
            color="#ca3e47"
            onPress={() => {
              this.startCarMode()
            }}
          />
          {/* <Button
            style={styles.buttonone}
            title="Test button"
            color="#ca3e47"
            onPress={() => {
              this.setState({
                isFalse: true
              })
            }}
          /> */}
        </View>

        {this.state.isFalse === true ? (
          <Modal style={styles.container}>
            <View>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: this.state.userLocation.lat,
                  longitude: this.state.userLocation.long,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              >
                <Marker
                  coordinate={{
                    latitude: this.state.userLocation.lat,
                    longitude: this.state.userLocation.long
                  }}
                  pinColor="red"
                  title="Pothole"
                ></Marker>
              </MapView>
              <Text style={styles.question}>Did you just hit a Pothole?</Text>
              <View style={styles.buttoncontainer}>
                <View style={styles.buttonone}>
                  <Button
                    style={styles.button}
                    title="Add Pothole"
                    onPress={e => {
                      this.addMarkerOnUserLocation(e)
                      this.setState({
                        isFalse: false
                      })
                    }}
                  />
                </View>
                <View style={styles.buttonone}>
                  <Button
                    style={styles.button}
                    title="No Pothole"
                    onPress={() =>
                      this.setState({
                        isFalse: false
                      })
                    }
                  />
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
    )
  }
}

function round(n) {
  if (!n) {
    return 0
  }

  return Math.floor(n * 100) / 100
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    margin: 20
  },
  question: {
    fontSize: 25,
    textAlign: 'center',
    padding: 20
  },
  button: {
    margin: 30
  },
  map: {
    width: 415,
    height: 415,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15
  },
  conmain: {
    backgroundColor: '#525252',
    margin: 20,
    padding: 20,
    borderRadius: 20
  },
  beta: {
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold'
  },
  carmode: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    padding: 10
  },
  buttoncontainer: {
    padding: 20
  },
  buttonone: {
    margin: 20,
    borderRadius: 20
  },
  all: {
    backgroundColor: '#313131'
  }
})

export default Sensors
