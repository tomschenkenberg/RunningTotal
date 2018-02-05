/* @flow */

/* 
 * Edit Players
 *  
 * Screen to list current players with delete button and component to add a new player.
 *
 * TODO: Edit the name of a player.
 * 
 */

import React from "react";
import { FlatList, Modal, Alert } from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  ListItem,
  Footer,
  FooterTab,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Input,
  Item
} from "native-base";
import { observer, inject } from "mobx-react";
import Icon from "../components/Icon";
import Header from "../components/GoBackHeader";

@inject("playerStore")
@observer
export default class EditPlayers extends React.Component {
  state = {
    isModalVisible: false,
    playername: ""
  };

  handleCreatePlayer() {
    this.props.playerStore.addPlayer(this.state.playername);
    this.setState({ playername: "" });
    this.setState({ isModalVisible: false });
  }
  handleDeletePlayer(id: number) {
    Alert.alert(
      "Delete Player",
      "Delete player " + this.props.playerStore.getPlayer(id).name + "?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.playerStore.deletePlayer(id) }
      ]
    );
  }

  renderItem = ({ item }) => {
    return (
      <ListItem>
        <Icon family="FontAwesome" name="user" style={{ fontSize: 28 }} />
        <Text style={{ paddingLeft: 9, fontSize: 28, flex: 2 }}>
          {item.name}
        </Text>
        <Button danger small onPress={() => this.handleDeletePlayer(item.id)}>
          <Icon family="FontAwesome" name="trash" />
        </Button>
      </ListItem>
    );
  };

  render() {
    const { navigate } = this.props.navigation;
    const playercount = this.props.playerStore.playercount;

    return (
      <Container>
        <Header
          title="Edit Players"
          backPress={() => this.props.navigation.goBack(null)}
        />
        <Content>
          <Modal
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => this.setState({ isModalVisible: false })}
            backdropColor={"red"}
            backdropOpacity={1}
            animationInTiming={2000}
            animationOutTiming={2000}
            backdropTransitionInTiming={2000}
            backdropTransitionOutTiming={2000}
            onShow={() => {
              this.setState({ playername: "" });
              // Set focus on input
              // See: https://github.com/GeekyAnts/NativeBase/issues/194
              this.nameInput._root.focus();
            }}
          >
            <Card>
              <CardItem header>
                <Text style={{ fontSize: 24 }}>Add Player</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Item regular>
                    <Input
                      autoCorrect={false}
                      returnKeyType="done"
                      multiline={false}
                      ref={c => {
                        this.nameInput = c;
                      }}
                      placeholder="Player name"
                      placeholderTextColor="#444"
                      underlineColorAndroid="#888"
                      onChangeText={playername => this.setState({ playername })}
                    />
                  </Item>
                </Body>
              </CardItem>
              <CardItem footer>
                <Left>
                  <Button
                    success
                    onPress={() => this.handleCreatePlayer()}
                    accessibilityLabel="Add Player"
                    disabled={
                      this.state.playername == "" ||
                      playercount > 8 ||
                      this.props.playerStore.playerExists(this.state.playername)
                    }
                  >
                    <Icon
                      family="FontAwesome"
                      name="user-plus"
                      style={{ fontSize: 19 }}
                    />
                    <Text style={{ fontSize: 19 }}>Add Player</Text>
                  </Button>
                </Left>
                <Right>
                  <Button
                    dark
                    onPress={() => this.setState({ isModalVisible: false })}
                  >
                    <Text style={{ fontSize: 19 }}> Cancel </Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Modal>
          <FlatList
            data={this.props.playerStore.players.values()}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              vertical
              onPress={() => this.setState({ isModalVisible: true })}
            >
              <Icon
                family="FontAwesome"
                name="user-plus"
                style={{ fontSize: 19 }}
              />
              <Text>Add Player</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
