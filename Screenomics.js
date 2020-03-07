import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter,
  Button
} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import * as RNFS from "react-native-fs";
import axios from "axios";

import { setRunningState } from "./actions/stateActions";
import RecorderManager from "./RecorderManager";

// Color Pallette
const gun_metal = "#292f36";
const sunset_orange = "#ee6352";
const white_isabelline = "#efefef";
const light_sea_green = "#1fb299";
const sea_green = "#27debf";

const createFormData = (video, body) => {
  const data = new FormData();
  data.append("file", {
    name: "vid_name",
    uri: "vid_uri"
  });
  Object.keys(video).forEach(key => {
    data.append(key, body[key]);
  });
};

class Screenomics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameArray: []
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

  uploadFile = () => {
    const url = "";
    const path =  `../${RNFS.ExternalStorageDirectoryPath}/Download/screenomics`
    RNFS.readDir(
      path
    ).then(res => {
      console.log("Reading file");
      res.map(file => {
        RNFS.readFile(
          path + `/${file.name}`,
          "base64"
        ).then(val => {
          // saving base64 file as .txt in main storage
          // attempted using https://base64.guru/converter/decode/video to decode base64 result
          // success
          RNFS.writeFile(path + `/text.txt`, val, 'utf8')
        });
      });
    });
  };

  render() {
    return (
      <Fragment>
        <StatusBar translucent={true} />
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
          <Button onPress={this.uploadFile} title="Uploading" />
        </View>
      </Fragment>
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
    transform: [{ scaleX: 2 }, { scaleY: 2 }]
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
