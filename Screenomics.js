import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

import { setRunningState } from "./actions/stateActions";
import RecorderManager from "./RecorderManager";

// Color Pallette
const gun_metal = "#292f36";
const sunset_orange = "#ee6352";
const white_isabelline = "#efefef";
const light_sea_green = "#1fb299";
const sea_green = "#27debf";

class Screenomics extends Component {
  constructor(props) {
    super(props);

    DeviceEventEmitter.addListener("checkStatus", status => {
      console.log(status);
      this.props.reduxChangeStatus(status);
    });
  }

  toggleSwitch = value => {
    this.props.reduxChangeStatus(!this.props.isRunning);
    if (value) {
      RecorderManager.start();
    } else if (!value) {
      RecorderManager.stop();
    }
  };

  checkStatus = () => {
    RecorderManager.checkStatus();
  };

  render() {
    return (
      <View style={styles.container}>
        <ToggleSwitch
          style={styles.switch}
          onColor={sea_green}
          offColor={sunset_orange}
          size="large"
          onToggle={isOn => this.toggleSwitch(isOn)}
          isOn={this.props.isRunning}
        />
        {this.props.isRunning ? (
          <Text style={styles.textCapturing}>CAPTURING</Text>
        ) : (
          <Text style={styles.textIdle}>IDLE</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: gun_metal,
    alignItems: "center",
    justifyContent: "center"
  },
  switch: {
    paddingVertical: 20,
    transform: [{scaleX: 2}, {scaleY: 2}]
  },
  textIdle: {
    paddingTop: 20,
    color: white_isabelline,
    fontWeight: "bold",
    fontSize: 14
  },
  textCapturing: {
    paddingTop: 20,
    color: light_sea_green,
    fontWeight: "bold",
    fontSize: 14
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


