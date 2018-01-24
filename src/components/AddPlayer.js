/* @flow */

import React, { Component } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Text, Icon, Button } from "native-base";
import { observer, inject } from "mobx-react";

@inject("playerStore")
@observer
export default class AddPlayer extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      playername: ""
    };
  }

  handleCreatePlayer() {
    this.props.playerStore.addPlayer(this.state.playername);
    this._textInput.setNativeProps({ text: "" });
    this.setState({ playername: "" });
  }

  render() {
    const playercount = this.props.playerStore.playercount;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add Player</Text>
        <View style={styles.header}>
          <View style={styles.left}>
            <TextInput
              autoCorrect={false}
              returnKeyType="done"
              multiline={false}
              ref={component => (this._textInput = component)}
              style={styles.inputtext}
              placeholder="Player name"
              placeholderTextColor="#444"
              underlineColorAndroid="#888"
              onChangeText={playername => this.setState({ playername })}
            />
          </View>
          <View style={styles.right}>
            <Button
              info
              onPress={() => this.handleCreatePlayer()}
              accessibilityLabel="Add Player"
              disabled={this.state.playername == "" || playercount > 8}
            >
              <Text>Add Player</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 16,
    marginTop: 8
  },
  left: {
    flex: 2,
    top: 10,
    padding: 3
  },
  right: {
    flex: 1,
    top: 0,
    padding: 8,
    justifyContent: "center"
  },
  inputtext: {
    color: "#000",
    top: 0
  }
});
