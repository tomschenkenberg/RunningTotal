/* @flow */

import React from "react";
import { StyleSheet, FlatList, Modal } from "react-native";
import {
  Text,
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
  Item,
  Header,
  Title
} from "native-base";
import { observer, inject } from "mobx-react";
import Icon from "../components/Icon";

@inject("playerStore")
@observer
export default class PlayerScreen extends React.Component {
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
    const t = (scorecount==1) ? "recorded score" : "recorded scores";   

    return (
      <ListItem itemHeader>
        <Text style={{ fontSize: 20 }}>
          {scorecount} {t} for {playername}
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
            <Icon family="FontAwesome" name="pencil" style={{ fontSize: 15 }} />
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
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}
            >
              <Icon
                family="FontAwesome"
                name="arrow-left"
                style={{ fontSize: 28 }}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 28, textAlign: "left" }}>
              Player {this.props.playerStore.getPlayer(params.userid).name}
            </Title>
          </Body>
        </Header>
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
                <Text style={{ fontSize: 24 }}>Edit Score</Text>
              </CardItem>
              <CardItem>
                <Left />
                <Body>
                  <Item regular>
                    <Input
                      autoCorrect={false}
                      returnKeyType="done"
                      keyboardType="numeric"
                      multiline={false}
                      ref={c => {
                        this.nameInput = c;
                      }}
                      onChangeText={editscore => this.setState({ editscore })}
                      defaultValue={this.state.editscore.toString()}
                    />
                  </Item>
                </Body>
                <Right />
              </CardItem>
              <CardItem footer>
                <Left>
                  <Button
                    success
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
                    <Icon
                      family="FontAwesome"
                      name="check"
                      style={{ fontSize: 19 }}
                    />
                    <Text style={{ fontSize: 19 }}>OK</Text>
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
    fontSize: 25,
    textAlign: "right"
  }
});
