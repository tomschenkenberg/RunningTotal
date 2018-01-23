/* @flow */

import React, { Component } from "react";
import {
  Container,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Text
} from "native-base";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";

// https://github.com/react-native-community/react-native-modal
import Modal from "react-native-modal";
import { observable, toJS } from "mobx";
import { observer, inject } from "mobx-react";
import { Observer } from "mobx-react/native";

@inject("playerStore")
@observer
export default class MainScreen extends Component {
  state = {
    isModalVisible: false,
    currentPlayerId: 0,
    currentPlayerName: "",
    scoreInput: ""
  };

  static navigationOptions = {
    title: "RunningTotal"
  };

  _openModal(id: number, playername: string) {
    this.setState({ currentPlayerId: id });
    this.setState({ currentPlayerName: playername });
    this.setState({ isModalVisible: true });
  }

  _closeModal() {
    this.setState({ isModalVisible: false });
    this.setState({ scoreInput: "" });
  }

  _submitModal(value: number = 0) {
    console.log("SUBMITmodal: " + this.state.currentPlayerId);
    console.log(this.props.playerStore.getPlayer(this.state.currentPlayerId));

    console.log("data = " + this.props.playerStore.players.length);

    //this.props.playerStore.addPlayerScore(34, 3);

    this.props.playerStore
      .getPlayer(this.state.currentPlayerId)
      .addScore(value);

    console.log("done");

    this._closeModal();
  }

  handleNewScore = text => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    this.setState({ scoreInput: newText });
  };

  _renderItem = ({ item }) => {
    const scorecount = this.props.playerStore.getPlayer(item.id).scorecount;
    const totalscore = this.props.playerStore.getPlayer(item.id).totalscore;

    return (
      <Observer>
        {() => (
          <View style={[styles.container, { backgroundColor: item.bgcolor }]}>
            <View style={styles.left}>
              <TouchableOpacity
                style={styles.left}
                onPress={() =>
                  this.props.navigation.navigate("Player", {
                    userid: item.id,
                    username: item.name
                  })
                }
              >
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.name}>#{scorecount}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.scoreview}
                onPress={() => this._openModal(item.id, item.name)}
              >
                <Text style={styles.score}>{totalscore}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Observer>
    );
  };

  _renderSeparator = () => {
    return <View style={styles.seperator} />;
  };

  _renderHeader = () => {
    return <View style={styles.headerfooter} />;
  };

  _renderFooter = () => {
    return <View style={styles.headerfooter} />;
  };

  _renderButton = (text, onPress, disable = false) => (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <Content>
          <View style={styles.maincontainer}>
            <Modal
              visible={this.state.isModalVisible}
              onRequestClose={() => this._closeModal()}
              backdropColor={"red"}
              backdropOpacity={1}
              animationInTiming={2000}
              animationOutTiming={2000}
              backdropTransitionInTiming={2000}
              backdropTransitionOutTiming={2000}
            >
              <View style={styles.modalContent}>
                <Text>Enter new score for {this.state.currentPlayerName}</Text>
                <TextInput
                  autoCorrect={false}
                  returnKeyType="done"
                  multiline={false}
                  style={styles.inputscore}
                  maxLength={4}
                  keyboardType="numeric"
                  onChangeText={this.handleNewScore}
                  value={this.state.scoreInput}
                  autoFocus={true}
                />
                <View style={styles.buttoncontainer}>
                  {this._renderButton(
                    "  +  ",
                    () => this._submitModal(this.state.scoreInput),
                    this.state.scoreInput == ""
                  )}
                  {this._renderButton(
                    "  -  ",
                    () => this._submitModal(-parseInt(this.state.scoreInput)),
                    this.state.scoreInput == ""
                  )}
                  {this._renderButton("Cancel", () => this._closeModal())}
                </View>
              </View>
            </Modal>
            <View>
              <FlatList
                data={this.props.playerStore.getSortedArray()}
                keyExtractor={item => item.id}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderSeparator}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
              />
            </View>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("EditPlayers")}
            >
              <Icon name="settings" />
              <Text>Players</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.playerStore.resetScores()}
            >
              <Icon name="alert" />
              <Text>Reset Scores</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#181e29"
  },
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
    backgroundColor: "#181e29"
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
