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
      <Text>Latitude</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => setNewLatitude(e.target.value)}
        value={latitude}
      />
      <Text>Longitude</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => setNewLongitude(e.target.value)}
        value={longitude}
      />
      <Button title="Submit" onPress={() => handleSubmit()} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 30
  }
})

export default AddNewMarker
