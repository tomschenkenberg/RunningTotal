/* @flow */

import React from "react";
import { Linking } from "react-native";
import {
  Text,
  Button,
  Container,
  Content,
  Left,
  Body,
  Right,
  Item,
  Header,
  Title
} from "native-base";
import Icon from "../components/Icon";

export default class Info extends React.Component {
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
            <Title style={{ fontSize: 28, textAlign: "left" }}>About Totally</Title>
          </Body>
        </Header>
        <Content padder>
          <Text>Totally is a free App to keep scores in card games.</Text>
          <Title style={{ color: "#44c", paddingTop:20}}>Author</Title>
          <Text>Name: Tom Schenkenberg</Text>
          <Text>E-Mail: tom@schenkenberg.nl</Text>
          <Text>Twitter:</Text>
          <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://twitter.com/tomschenkenberg')}>
      @tomschenkenberg
</Text>
        </Content>
      </Container>
    );
  }
}
