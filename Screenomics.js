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

import { setRunningState } from "./actions/stateActions";
import RecorderManager from "./RecorderManager";

class Screenomics extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  toggle = () => {
    this.props.reduxChangeStatus(!this.props.isRunning);
    if (this.props.isRunning) {
      RecorderManager.start();
    } else if (!this.props.isRunning) {
      RecorderManager.stop();
    }
  };

  checkStatus = () => {
    RecorderManager.checkStatus();
  };

  render() {
    const { androidVideoUrl } = this.state;
    return (
      <View style={styles.container}>
        <Text>Captured video filepath</Text>
        {androidVideoUrl ? (
          <Text>{androidVideoUrl}</Text>
        ) : (
          <Text>No video captured</Text>
        )}
        <Button
          style={styles.button}
          onPress={this.toggle}
          title="Switch toggle"
        />
        <Button
          style={styles.button}
          onPress={this.checkStatus}
          title="Check status"
        />
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
    reduxChangeStatus: trueFalse => dispatch(setRunningState(trueFalse))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screenomics);
