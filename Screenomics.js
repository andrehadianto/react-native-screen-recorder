import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  DeviceEventEmitter
} from "react-native";

import RecorderManager from "./RecorderManager";


class Screenomics extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      () => this.props.reduxChangeStatus(status);
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
  };





  render() {
    const { androidVideoUrl, disableStart, disableStopped } = this.state;
    return (
      <View style={styles.container}>
        <Text>Captured video filepath</Text>
        {androidVideoUrl ? (
          <Text>{androidVideoUrl}</Text>
        ) : (
          <Text>No video captured</Text>
        )}
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
        <Button onPress={this.checkStatus} title="Check status" />
        <Text>{`${this.props.isRunning}`}</Text>
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

const mapStateToProps = state => {
  return {
    isRunning: state.stateReducer.isRunning
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reduxChangeStatus: trueFalse => dispatch(isRunning(trueFalse))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screenomics);


