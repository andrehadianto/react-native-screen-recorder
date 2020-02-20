import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  CameraRoll,
  Button,
  NativeModules,
  Platform,
  DeviceEventEmitter,
} from "react-native";
import VideoPlayer from "react-native-video-controls";
import * as RNFS from "react-native-fs";

// NativeModules refer to Android's main/java folder.
// It serves as a bridge between ReactNative class and Android Java class
const { RecorderManager } = NativeModules;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableStart: false,
      disableStopped: true,
      androidVideoUrl: null,
    };

    DeviceEventEmitter.addListener("updateFilePath", filePath => {
      console.log(filePath);
      this.setState({ androidVideoUrl: filePath });
    });
  }

  start = () => {
    RecorderManager.start();
    this.setState({
      disableStart: true,
      disableStopped: false,
    });
  };

  stop = () => {
    RecorderManager.stop();
    this.setState({
      disableStart: false,
      disableStopped: true,
    });
  };

  rendernControlBtnGroup = () => {
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
    const { androidVideoUrl } = this.state;
    return (
      <View style={styles.container}>
        <Text>Captured video filepath</Text>
        {androidVideoUrl ? <Text>{androidVideoUrl}</Text> : <Text>No video captured</Text>}
        <Text>{androidVideoUrl}</Text>
        {this.rendernControlBtnGroup()}
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
