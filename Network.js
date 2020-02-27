import React, { Component } from "react";
import { View, Text, Button, Alert, NetInfo, Platform } from "react-native";

export default class Network extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  CheckConnectivity = () => {
    var that = this;
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      hours:
        hours + ':' + min + ':' + sec,
    });
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) {
          Alert.alert("You are online!");
          Alert.alert(this.state.hours.toString())
        } else {
          Alert.alert("You are offline!");
        }
      });
    } else {
      // For iOS devices
      NetInfo.isConnected.addEventListener(
        "connectionChange",
        this.handleFirstConnectivityChange
      );
    }
  };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      Alert.alert("You are offline!");
    } else {
      Alert.alert("You are online!");
    }
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.CheckConnectivity()}
          title="Check Internet Connectivity"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}