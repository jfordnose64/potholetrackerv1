import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import Axios from 'axios'

const AddNewMarker = () => {
  const [latitude, setNewLatitude] = useState('')
  const [longitude, setNewLongitude] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(latitude)
    console.log(longitude)
    postData()
  }

  const postData = async () => {
    const url = 'http://10.0.2.2:5000/api/Pothole'
    const resp = await Axios.post(url, {
      latitude: latitude,
      longitude: longitude
    })
    console.log('submitted')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Marker</Text>
      <Text style={styles.lat}>Latitude</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => setNewLatitude(e)}
        value={latitude}
        placeholder="Ex. -12.5"
      />
      <Text style={styles.long}>Longitude</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => setNewLongitude(e)}
        value={longitude}
        placeholder="Ex. 34.555"
      />
      <Button title="Submit" onPress={e => handleSubmit(e)} color="#ca3e47" />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderBottomWidth: 1.5,
    borderEndWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    width: 200,
    color: 'black',
    backgroundColor: '#525252'
  },
  container: {
    backgroundColor: '#525252',
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  lat: {
    fontSize: 20
  },
  long: {
    fontSize: 20
  }
})

export default AddNewMarker
