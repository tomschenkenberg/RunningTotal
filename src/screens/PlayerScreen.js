/* @flow */

import React, { Component } from "react";
import { Text, Button } from "native-base";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { List, ListItem } from "react-native-elements";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";

@inject("playerStore")
@observer
export default class PlayerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Player ${navigation.state.params.username}`
  });

  _renderItem = ({ item }) => {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.row}>
        <Text style={styles.col1}>#{item[0]}</Text>
        <Text style={styles.col2}>{item[1]}</Text>
        <Button
          style={styles.col3}
          onPress={() => this.props.playerStore.getPlayer(params.userid).deleteScore(item[0])}
          title="X"
        />
      </View>
    );
  };

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  _renderHeader = () => {
    const { params } = this.props.navigation.state;
    const playername = this.props.playerStore.getPlayer(params.userid).name;
    const scorecount = this.props.playerStore.getPlayer(params.userid)
      .scorecount;

    return (
      <View
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%",
          padding: 10
        }}
      >
        <Text>
          {scorecount} recorded scores for {playername}
        </Text>
      </View>
    );
  };

  _renderFooter = () => {
    const { params } = this.props.navigation.state;
    const totalscore = this.props.playerStore.getPlayer(params.userid)
      .totalscore;
    return (
      <View style={[styles.row, { backgroundColor: "#cccccc" }]}>
        <Text style={styles.col1} />
        <Text style={styles.col2}>{totalscore}</Text>
        <Text style={styles.col3} />
      </View>
    );
  };

  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <List>
          <FlatList
            data={this.props.playerStore.getPlayer(params.userid).scores}
            keyExtractor={index => index}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
            ListHeaderComponent={this._renderHeader}
            ListFooterComponent={this._renderFooter}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181e29"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 8,
    paddingRight: 0
  },
  footer: {
    color: "#444444",
    padding: 4,
    paddingRight: 30,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "right"
  },
  col1: {
    flex: 2,
    top: 0,
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 20
  },
  col2: {
    flex: 3,
    top: 0,
    justifyContent: "center",
    paddingRight: 80,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "right"
  },
  col3: {
    flex: 1,
    top: 0,
    marginRight: 10,
    justifyContent: "center"
  }
});
