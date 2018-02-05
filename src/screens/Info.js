/* @flow */

import React from "react";
import { Linking, View } from "react-native";
import {
  Text,
  Button,
  Container,
  Content,
  Footer,
  Left,
  Body,
  Right,
  Item,
  Title
} from "native-base";
import Icon from "../components/Icon";
import Header from "../components/GoBackHeader";
import VersionNumber from "react-native-version-number";

export default class Info extends React.Component {
  textlink(label: string, link: string) {
    const linklabel = link.replace(/(^\w+:|^)\/\//, "");
    return (
      <View style={{ flexDirection: "row" }}>
        <Text>{label}: </Text>
        <Text style={{ color: "blue" }} onPress={() => Linking.openURL(link)}>
          {linklabel}
        </Text>
      </View>
    );
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <Container>
        <Header
          title="About Totally"
          backPress={() => this.props.navigation.goBack(null)}
        />
        <Content padder>
          <Text>
            Totally is a simple and free App to keep scores in card games.
          </Text>
          <Title style={{ color: "#44c", paddingTop: 20 }}>Author</Title>
          <Text>Name: Tom Schenkenberg</Text>
          <Text>E-Mail: tom@schenkenberg.nl</Text>
          {this.textlink("Web", "https://schenkenberg.nl")}
          {this.textlink("Twitter", "https://twitter.com/tomschenkenberg")}
          {this.textlink(
            "Source",
            "https://github.com/tomschenkenberg/Totally"
          )}
        </Content>
        <Footer>
          <Text>version: {VersionNumber.appVersion} </Text>
          <Text>(build: {VersionNumber.buildVersion})</Text>
        </Footer>
      </Container>
    );
  }
}
