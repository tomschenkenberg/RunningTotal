/* @flow */
import { StackNavigator } from "react-navigation";

// Screens
import PlayerDetails from "./screens/PlayerDetails";
import MainScreen from "./screens/MainScreen";
import EditPlayers from "./screens/EditPlayers";
import Info from "./screens/Info";

const stackNavigatorConfig = {
  initialRouteName: "Main",

  // We don't want the headers from react-navigation because we're using NativeBase headers
  headerMode: "none"
};

export default StackNavigator(
  {
    Main: { screen: MainScreen },
    Player: { screen: PlayerDetails },
    EditPlayers: { screen: EditPlayers },
    Info: { screen: Info }
  },
  stackNavigatorConfig
);
