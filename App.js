import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  Platform,
  DeviceEventEmitter
} from "react-native";

// NativeModules refer to Android's main/java folder.
// It serves as a bridge between ReactNative class and Android Java class
const { RecorderManager } = NativeModules;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      disableStart: false,
      disableStopped: true,
      androidVideoUrl: null
    };

    DeviceEventEmitter.addListener("updateFilePath", filePath => {
      console.log(filePath);
      this.setState({ androidVideoUrl: filePath });
    });
    DeviceEventEmitter.addListener("checkStatus", status => {
      console.log(status);
      this.setState({ isRunning: status });
    });
  }

  start = () => {
    RecorderManager.start();
    this.setState({
      disableStart: true,
      disableStopped: false
    });
  };

  stop = () => {
    RecorderManager.stop();
    this.setState({
      disableStart: false,
      disableStopped: true
    });
  };

  checkStatus = () => {
    RecorderManager.checkStatus();
  }

  renderControlBtnGroup = () => {
    const { disableStart, disableStopped } = this.state;
    return (
      <View style={styles.footer}>
        <Button
          style={styles.button}
          disabled={disableStart}
          title="Start"
          onPress={this.start}
        />
        <Button
          style={styles.button}
          disabled={disableStopped}
          title="Stop"
          onPress={this.stop}
        />
      </View>
    );
  };

  render() {
    const { androidVideoUrl, isRunning } = this.state;
    return (
      <View style={styles.container}>
        <Text>Captured video filepath</Text>
        {androidVideoUrl ? (
          <Text>{androidVideoUrl}</Text>
        ) : (
          <Text>No video captured</Text>
        )}
        <Text>{androidVideoUrl}</Text>
        {this.renderControlBtnGroup()}
        <Button onPress={this.checkStatus} title="Check Status"/>
        <Text>{isRunning.toString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  content: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    justifyContent: "center"
  },

  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,
    fontSize: 24
  },

  footer: {
    backgroundColor: Platform.OS === "ios" ? "#eee" : "#fff",
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingVertical: 20
  }
});

export default App;
