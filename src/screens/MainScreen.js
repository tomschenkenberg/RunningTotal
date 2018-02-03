/* @flow */

import React from "react";
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
  Text,
  ListItem,
  List,
  Card,
  CardItem,
  Item,
  Input
} from "native-base";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity, Modal
} from "react-native";

// https://github.com/react-native-community/react-native-modal
//import Modal from "react-native-modal";

import { observer, inject } from "mobx-react";
import { Observer } from "mobx-react/native";

@inject("playerStore")
@observer
export default class MainScreen extends React.Component {
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
    this.props.playerStore
      .getPlayer(this.state.currentPlayerId)
      .addScore(value);
    this._closeModal();
  }

  _renderButton = (text, onPress, disable = false) => (
    <Button success onPress={onPress} disabled={disable}>
      <Text> {text} </Text>
    </Button>
  );

  _renderModalContent = () => (
    <Card>
      <CardItem header>
        <Text>Enter new score for {this.state.currentPlayerName}</Text>
      </CardItem>
      <CardItem>
        <Left />
        <Body>
          <Item regular>
            <Input
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
          </Item>
        </Body>
        <Right />
      </CardItem>
      <CardItem footer>
        <Left>
          {this._renderButton(
            "  +  ",
            () => this._submitModal(this.state.scoreInput),
            this.state.scoreInput == ""
          )}
        </Left>
        <Body>
          {this._renderButton(
            "  -  ",
            () => this._submitModal(-parseInt(this.state.scoreInput)),
            this.state.scoreInput == ""
          )}
        </Body>
        <Right>
          <Button dark onPress={() => this._closeModal()}>
            <Text> Cancel </Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );

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

  _renderHeader = () => {
    return <ListItem header first />;
  };

  _renderItem = ({ item }) => {
    const scorecount = this.props.playerStore.getPlayer(item.id).scorecount;
    const totalscore = this.props.playerStore.getPlayer(item.id).totalscore;

    return (
      <Observer>
        {() => (
          <ListItem style={{ backgroundColor: item.bgcolor }}>
            <Left>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Player", {
                    userid: item.id,
                    username: item.name
                  })
                }
              >
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            </Left>
            <Body>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Player", {
                    userid: item.id,
                    username: item.name
                  })
                }
              >
                <Text style={styles.name}>#{scorecount}</Text>
              </TouchableOpacity>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => this._openModal(item.id, item.name)}
              >
                <Text style={styles.score}>{totalscore}</Text>
              </TouchableOpacity>
            </Right>
          </ListItem>
        )}
      </Observer>
    );
  };

  _renderFooter = () => {
    return <ListItem footer />;
  };

  render() {
    const { navigate } = this.props.navigation;
    const playersdata = this.props.playerStore.SortedArray;
    return (
      <Container>
        <Content>
          <Modal
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => this._closeModal()}
            backdropColor={"red"}
            backdropOpacity={1}
            animationInTiming={2000}
            animationOutTiming={2000}
            backdropTransitionInTiming={2000}
            backdropTransitionOutTiming={2000}
          >
            {this._renderModalContent()}
          </Modal>
          <List>
            <FlatList
              data={playersdata}
              keyExtractor={item => item.id}
              renderItem={this._renderItem}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
            />
          </List>
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
  name: {
    fontSize: 20
  },
  score: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "right"
  },
  inputscore: {
    color: "#222222",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "right",
    width: "40%"
  }
});
