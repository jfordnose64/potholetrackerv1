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
      />
      <Text style={styles.long}>Longitude</Text>
      <TextInput
        style={styles.input}
        onChangeText={e => setNewLongitude(e)}
        value={longitude}
      />
      <Button title="Submit" onPress={e => handleSubmit(e)} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    width: 200,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e9e7e7',
    marginBottom: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 7,
    width: 350,
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
