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
import { FlatList } from "react-native";
import { Container, Content, Text, Button, ListItem, Icon } from "native-base";
import AddPlayer from "../components/AddPlayer";
import { observer, inject } from "mobx-react";

@inject("playerStore")
@observer
export default class EditPlayersScreen extends React.Component {
  static navigationOptions = {
    title: "Edit Players"
  };

  renderItem = ({ item }) => {
    return (
      <ListItem>
        <Icon name="ios-person" />
        <Text style={{ paddingLeft: 9, fontSize: 22, flex: 2 }}>
          {item.name}
        </Text>
        <Button
          danger
          onPress={() => this.props.playerStore.deletePlayer(item.id)}
        >
          <Text>X</Text>
        </Button>
      </ListItem>
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
            renderItem={this.renderItem}
          />
          <AddPlayer />
        </Content>
      </Container>
    );
  }
}
