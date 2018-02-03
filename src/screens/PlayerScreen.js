/* @flow */

import React from "react";
import { StyleSheet, FlatList, Modal } from "react-native";
import {
  Text,
  Icon,
  Button,
  List,
  ListItem,
  Container,
  Content,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Input,
  Item
} from "native-base";
import { observer, inject } from "mobx-react";

@inject("playerStore")
@observer
export default class PlayerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Player ${navigation.state.params.username}`
  });
  state = {
    isModalVisible: false,
    editscore: "",
    editscorekey: 0
  };

  _renderHeader = () => {
    const { params } = this.props.navigation.state;
    const playername = this.props.playerStore.getPlayer(params.userid).name;
    const scorecount = this.props.playerStore.getPlayer(params.userid)
      .scorecount;

    return (
      <ListItem itemHeader>
        <Text>
          {scorecount} recorded scores for {playername}
        </Text>
      </ListItem>
    );
  };

  _renderItem = ({ item }) => {
    const { params } = this.props.navigation.state;

    return (
      <ListItem>
        <Left>
          <Text style={styles.big}>#{item[0]}</Text>
        </Left>
        <Body>
          <Text style={styles.big}>{item[1]}</Text>
        </Body>
        <Right>
          <Button
            icon
            info
            small
            onPress={() => {
              this.setState({ editscorekey: item[0] });
              this.setState({ editscore: item[1] });
              this.setState({ isModalVisible: true });
            }}
          >
            <Icon name="undo" />
          </Button>
        </Right>
      </ListItem>
    );
  };

  _renderFooter = () => {
    const { params } = this.props.navigation.state;
    const totalscore = this.props.playerStore.getPlayer(params.userid)
      .totalscore;
    return (
      <ListItem style={{ backgroundColor: "#cccccc" }}>
        <Left />
        <Body>
          <Text style={styles.big}>{totalscore}</Text>
        </Body>
        <Right />
      </ListItem>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
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
              // Set focus on input
              // See: https://github.com/GeekyAnts/NativeBase/issues/194
              this.nameInput._root.focus();
            }}
          >
            <Card>
              <CardItem header>
                <Text>Edit Score</Text>
              </CardItem>
              <CardItem>
              <Left/>
                <Body>
                  <Item regular>
                    <Input
                      autoCorrect={false}
                      returnKeyType="done"
                      multiline={false}
                      ref={c => {
                        this.nameInput = c;
                      }}
                      onChangeText={editscore => this.setState({ editscore })}
                      defaultValue={this.state.editscore.toString()}
                    />
                  </Item>
                </Body><Right/>
              </CardItem>
              <CardItem footer>
                <Left>
                  <Button
                    info
                    accessibilityLabel="OK"
                    disabled={this.state.editscore == ""}
                    onPress={() => {
                      this.props.playerStore
                        .getPlayer(params.userid)
                        ._scores.set(
                          this.state.editscorekey,
                          parseInt(this.state.editscore)
                        );
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <Text>OK</Text>
                  </Button>
                </Left>
                <Right>
                  <Button
                    dark
                    onPress={() => this.setState({ isModalVisible: false })}
                  >
                    <Text> Cancel </Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Modal>
          <List>
            <FlatList
              data={this.props.playerStore.getPlayer(params.userid).scores}
              keyExtractor={index => index}
              renderItem={this._renderItem}
              ListHeaderComponent={this._renderHeader}
              ListFooterComponent={this._renderFooter}
            />
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  big: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "right"
  }
});
