/* @flow */

import React, { Component } from "react";
import { AppRegistry, AsyncStorage } from "react-native";
import { useStrict } from "mobx";
import { Provider } from "mobx-react/native";
import Router from "./router";
import PlayerStore from "./stores";
import { create } from "mobx-persist";

useStrict(true);

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

class RunningTotal extends Component {
  render() {
    //hydrate("playerStore3", PlayerStore).then(() =>
    //  console.log("PlayerStore is hydrated")
   // );
    return (
      <Provider playerStore={PlayerStore}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("RunningTotal", () => RunningTotal);
