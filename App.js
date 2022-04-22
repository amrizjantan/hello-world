import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView} from 'react-native';
 
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
 
// import react native gesture handler
import 'react-native-gesture-handler';
 
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
 
//import stack navigation
import { createStackNavigator } from '@react-navigation/stack';
 
// import buttom navigation
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
// Create the Stack navigator
const Stack = createStackNavigator();
 
// Create the Bottom navigator
//const Tab = createBottomTabNavigator();
 
export default class App extends React.Component{
// constructor (props) {
  // super(props);
 
  // this.state = {text:""};
 //}
 
render(){
 return (
   <NavigationContainer>
     <Stack.Navigator
       initialRouteName="Start"
     >
       <Stack.Screen
         name="Start"
         component={Start}
       />
       <Stack.Screen
         name="Chat"
         component={Chat}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
 }}
