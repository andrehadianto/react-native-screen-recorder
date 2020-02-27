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
const cyan = "#08b2e3";
const white_isabelline = "#efefef";
const light_sea_green = "#1fb299";

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
          onColor={light_sea_green}
          offColor={sunset_orange}
          size="large"
          onToggle={isOn => this.toggleSwitch(isOn)}
          isOn={this.props.isRunning}
        />
        {this.props.isRunning ? (
          <Text style={styles.text}>Screenomics: capturing</Text>
        ) : (
          <Text style={styles.text}>Screenomics: idle</Text>
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
    paddingVertical: 20
  },
  text: {
    paddingTop: 20,
    color: white_isabelline
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


