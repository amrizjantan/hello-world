import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { GiftedChat, Bubble, SystemMessage } from "react-native-gifted-chat";

//import firebase
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };

    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDj0DisvtCqmoDHoITkfqO8BjkzSHzxrTw",
      authDomain: "chatapp-87711.firebaseapp.com",
      projectId: "chatapp-87711",
      storageBucket: "chatapp-87711.appspot.com",
      messagingSenderId: "413850091575",
      appId: "1:413850091575:web:a3d67239818ee002c2ffb2",
    };

    //initialize app
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //reference firestore database
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    //name function for below System Message
    const name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    //authentication
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });
      //listener for collection updates
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  //adding new message to database collection
  addMessage() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: this.state.user,
    });
  }

  //when a message is sent, calls saveMessage
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
  }

  //dont receive updates from collection
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "red",
          },
          left: {
            backgroundColor: "#99f57d",
          },
        }}
      />
    );
  }

  render() {
    // color chosen on Start screen to be applied on chat screen
    let bgColor = this.props.route.params.bgColor;

    return (
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: bgColor }}
      >
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderBubble={this.renderBubble.bind(this)}
          user={{
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar,
          }}
        />

        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
