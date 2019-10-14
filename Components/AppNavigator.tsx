import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import React from 'react'
import Home from './Home'
import Map from './Map'
import Add from './Add'
import Car from './Car'

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  Map: { screen: Map },
  Add: { screen: Add },
  Car: { screen: Car }
})
const AppContainer = createAppContainer(AppNavigator)

export default AppContainer
