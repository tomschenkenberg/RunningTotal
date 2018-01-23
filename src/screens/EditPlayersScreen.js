/* @flow */

import React, { Component } from "react";
import { Container, Content, Left, Text } from "native-base";
import { StyleSheet, View, Button, FlatList } from "react-native";
import AddPlayer from "../components/AddPlayer";
import { observer, inject } from "mobx-react";

@inject("playerStore")
@observer
export default class EditPlayersScreen extends Component {
  static navigationOptions = {
    title: "Edit Players"
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <Button
          style={styles.right}
          onPress={() => this.props.playerStore.deletePlayer(item.id)}
          title=" X "
        />
      </View>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <FlatList
            data={this.props.playerStore.players.values()}
            keyExtractor={item => item.id}
            renderItem={this._renderItem}
          />
          <AddPlayer />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttoncontainer: {
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: "#aaa"
  },
  left: {
    flex: 3,
    flexDirection: "row",
    top: 0,
    padding: 3
  },
  right: {
    flex: 2,
    top: 5,
    padding: 8,
    justifyContent: "center"
  },
  name: {
    fontSize: 22,
    flex: 2
  },
  scoreview: {
    flex: 1,
    paddingRight: 50
  },
  score: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "right"
  },
  seperator: {
    height: 2,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginLeft: "0%"
  },
  headerfooter: {
    height: 40,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginLeft: "0%",
    padding: 10
  },
  inputscore: {
    color: "#222222",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "right",
    width: "40%"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});
