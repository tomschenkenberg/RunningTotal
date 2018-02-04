/* @flow */

import React from "react";
import { StyleSheet, ViewPropTypes } from "react-native";
import { Text, Header, Left, Button, Body, Right, Title } from "native-base";
import PropTypes from "prop-types";
import Icon from "./Icon";

export default class CustomHeader extends React.Component {
  render() {
    return (
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
          <Title style={{ fontSize: 28 }}>{this.props.title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

CustomHeader.propTypes = {
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  big: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "left",
    paddingLeft: 20,
    color: "#fff"
  }
});
