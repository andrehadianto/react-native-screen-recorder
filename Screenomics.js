import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter,
  TouchableOpacity
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import Modal from "react-native-modal";

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
    this.state = {
      isModalVisible: false
    };

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
      <Fragment>
        <StatusBar translucent={true} />
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                SCREENOMICS
              </Text>
              <Text style={{ fontSize: 10, color: "#fff" }}>BY SUTD TEAM</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.setState({ isModalVisible: true })}
              >
                <Text style={{ fontSize: 18, color: "#fff" }}>?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>
            <ToggleSwitch
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
        </View>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingHorizontal: 40,
              paddingVertical: 20
            }}
          >
            <Text>Hello!</Text>
            {/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
          </View>
        </Modal>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gun_metal,
    paddingTop: 20
  },
  header: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  body: {
    flex: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20
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
