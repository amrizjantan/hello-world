import React from 'react';
import { View, Text, Button, TextInput, StyleSheet} from 'react-native';
 
 
export default class Chat extends React.Component {
 render() {
   let name = this.props.route.params.name;
   this.props.navigation.setOptions({title:name});
 
   const { bgColor } = this.props.route.params;
 
   return (
     <View style={{
       flex:1,
       justifyContent: 'center',
       backgroundColor: bgColor,
       alignItems: 'center'
       }}>
       <Text>Chat here!</Text>
       <Button
       title='Go to Start'
       onPress={()=> this.props.navigation.navigate ('Start')}
       />
     </View>
   )
 }
}
