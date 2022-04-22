import React from 'react';
import { View, Text, Button, TextInput, Pressable, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
 
import BackgroundImage from '../assets/background-image.png'
import icon from '../assets/icon.png';
 
export default class Start extends React.Component {
 constructor (props) {
  super(props);
 
  this.state = {
    name:"",
    bgColor:this.colors.blue
  };
}

// function to update the state with the new background color for Chat Screen chosen by the user
changeBgColor = (newColor) => {
  this.setState({ bgColor: newColor });
};

 // background colors to choose from; will be used to update bgColor state
 colors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green:'#B9C6AE'
};

render() {
  return (
      // Components to create the color arrays, titles and the app's colors
    <View style={styles.container}>
     
    <ImageBackground
    source={BackgroundImage}
    resizeMode='cover'
    style={styles.backgroundImage}>
    </ImageBackground>
   
    <View style={styles.titleBox}>
      <Text style={styles.title}>Chat App</Text>
    </View>
    <View style={styles.box1}>
           <View style={styles.inputBox}>
             <Image source={icon} style={styles.image} />
            
             <TextInput
               style={styles.input}
               onChangeText={(text) => this.setState({ name: text})}
               value={this.state.name}
               placeholder='Please enter your name'
             />
           </View>
 
           <View style={styles.colorBox}>
             <Text style={styles.chooseColor}> Choose Background Color: </Text>
           </View>
 
           <View style={styles.colorArray}>
             <TouchableOpacity
               style={styles.color1}
               onPress={() => this.changeBgColor(this.colors.black)}>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.color2}
               onPress={() => this.changeBgColor(this.colors.purple)}>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.color3}
               onPress={() => this.changeBgColor(this.colors.grey)}>
             </TouchableOpacity>
             <TouchableOpacity
               style={styles.color4}
               onPress={() => this.changeBgColor(this.colors.green)}>
             </TouchableOpacity>
              </View>
 
           <Pressable
             style={styles.button}
             onPress={() => this.props.navigation.navigate('Chat', {
              name: this.state.name,
              bgColor: this.state.bgColor
              })}>
              <Text style={styles.buttonText}>Start Chatting</Text>
          </Pressable>
        </View>
      </View>
  )
}
}

const styles = StyleSheet.create({
container: {
  flex:1,
  flexDirection: 'column',
},

backgroundImage: {
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
},

titleBox: {
  height: '20%',
  width: '100%',
  alignItems: 'center',
  paddingTop:40 
},

title: {
  fontSize: 45,
  fontWeight: '600',
  color: '#FFFFFF',
  },

box1: {
  backgroundColor: 'white',
  height: '44%',
  width: '88%',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  marginBottom: 20,
  padding: 15,
  height: 250,
  marginLeft:20,
  flexDirection: 'column',
},

inputBox: {
  borderWidth: 2,
  borderRadius: 1,
  borderColor: 'grey',
  width: '88%',
  height: 60,
  paddingLeft: 20,
  flexDirection: 'row',
  alignItems: 'center'
},

image: {
  padding: 10,
  margin: 5,
  height: 20,
  width: 20,
  resizeMode: 'stretch',
  alignItems: 'center',
  opacity: 0.5,
},

input: {
  fontSize: 16,
  fontWeight: "300",
  color: '#757083',
  opacity: 0.5,
},

colorBox: {
  marginRight: 'auto',
  paddingLeft:15,
  width: '88%'
},

chooseColor: {
  fontSize: 16,
  fontWeight: "300",
  color: '#757083',
  opacity: 1,
},

colorArray: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '88%',
},

color1: {
  backgroundColor: '#090C08',
  width: 50,
  height: 50,
  borderRadius: 25
},

color2: {
  backgroundColor: '#474056',
  width: 50,
  height: 50,
  borderRadius: 25
},

color3: {
  backgroundColor: '#8A95A5',
  width: 50,
  height: 50,
  borderRadius: 25
},
color4: {
  backgroundColor: '#B9C6AE',
  width: 50,
  height: 50,
  borderRadius: 25
},

button: {
  width: '88%',
  height: 70,
  backgroundColor: '#757083',
  alignItems: 'center',
  justifyContent: 'center'
},

buttonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: "600"
}
});
