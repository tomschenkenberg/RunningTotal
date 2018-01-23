/* @flow */

import { StackNavigator } from "react-navigation";

// Screens
import PlayerScreen from "./screens/PlayerScreen";
import MainScreen from "./screens/MainScreen";
import EditPlayersScreen from "./screens/EditPlayersScreen";

const stackNavigatorConfig = {
  initialRouteName: "Main"
};

export default StackNavigator(
  {
    Main: { screen: MainScreen },
    Player: { screen: PlayerScreen },
    EditPlayers: { screen: EditPlayersScreen }
  },
  stackNavigatorConfig
);
