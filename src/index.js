/* @flow */

import React, { Component } from "react";
import { AppRegistry, AsyncStorage } from "react-native";
import { useStrict } from "mobx";
import { Provider } from "mobx-react/native";
import Router from "./router";
import PlayerStore from "./stores";

class RunningTotal extends Component {
  render() {
    return (
      <Provider playerStore={PlayerStore}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("RunningTotal", () => RunningTotal);
