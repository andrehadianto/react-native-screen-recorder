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

const { RecorderManager } = NativeModules;

class App extends Component {
  state = {
    videoUri: null,
    disableStart: false,
    disableStopped: true,
    disablePlayable: true,
    androidVideoUrl: null,
  };

  start = () => {
    RecorderManager.start();
    this.setState({
      disableStart: true,
      disableStopped: false,
      disablePlayable: true
    });
  };

  stop = () => {
    RecorderManager.stop();
    this.setState({
      disableStart: true,
      disableStopped: true,
      disablePlayable: false
    });
  };

  play = () => {
    const { androidVideoUrl } = this.state;
    if (androidVideoUrl) {
      this.setState({
        videoUri: androidVideoUrl,
        disableStart: true,
        disableStopped: true,
        disablePlayable: true
      });
    }
  };

  writeFile() {
    const path = RNFS.DocumentDirectoryPath + "/" + Date.now().toString();

    RNFS.writeFile(path, "New photo", "utf8")
      .then(success => {
        console.log("File is written!");
      })
      .catch(err => {
        console.warn(err.message);
      });
  }

  readFile() {
    const path = RNFS.DocumentDirectoryPath + "/test.txt";

    // RNFS.readFile(path, "utf8")
    //   .then((res) => {
    //     console.log("Finish reading");
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.warn(err.message);
    //   });

      RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(files => {
        console.log(files);
      })
      .catch((err) => {
        console.warn(err.message, err.code);
      });
  }

  playEnded = () => {
    this.setState({
      videoUri: null,
      disableStart: false,
      disableStopped: true,
      disablePlayable: true,
      androidVideoUrl: null
    });
  };

  keyboardDidShow = () => {
    this.setState({ keyboardIsShown: true });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardIsShown: false });
  };

  rendernControlBtnGroup = () => {
    const { disableStart, disableStopped, disablePlayable } = this.state;
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
        <Button
          style={styles.button}
          disabled={disablePlayable}
          title="Play"
          onPress={this.play}
        />
        <Button style={styles.button} title="Write" onPress={this.writeFile} />
        <Button style={styles.button} title="Read" onPress={this.readFile} />
      </View>
    );
  };

  componentWillMount() {
    DeviceEventEmitter.addListener("updateFilePath", filePath => {
      console.log(filePath);

      this.setState({ androidVideoUrl: filePath });
    });
  }

  componentDidMount() {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then(files => {
        console.log(files);
      })
      .catch(err => {
        console.warn(err.message, err.code);
      });
  }

  render() {
    const { videoUri } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {videoUri && (
            <VideoPlayer source={{ uri: videoUri }} onEnd={this.playEnded} />
          )}
          {!videoUri && (
            <TextInput
              style={styles.textInput}
              multiline
              underlineColorAndroid="white"
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          )}
        </View>
        <Text>{RNFS.DocumentDirectoryPath}</Text>
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
