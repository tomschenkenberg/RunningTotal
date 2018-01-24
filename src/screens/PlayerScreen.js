/* @flow */

import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Text, Button,List, ListItem, Container, Content  } from "native-base";
//import { } from "react-native-elements";
import { toJS } from "mobx";
import { observer, inject } from "mobx-react";

@inject("playerStore")
@observer
export default class PlayerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Player ${navigation.state.params.username}`
  });

  _renderItem = ({ item }) => {
    const { params } = this.props.navigation.state;

    return (
      <ListItem>
        <Text style={styles.col1}>#{item[0]}</Text>
        <Text style={styles.col2}>{item[1]}</Text>
        <View style={styles.col3}>
        <Button danger
          onPress={() => this.props.playerStore.getPlayer(params.userid).deleteScore(item[0])}
        ><Text>X</Text></Button>
        </View>
      </ListItem>
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
      <ListItem style={{ backgroundColor: "#cccccc" }}>
        <Text style={styles.col1} />
        <Text style={styles.col2}>{totalscore}</Text>
        <Text style={styles.col3} />
      </ListItem>
    );
  };

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
      <Content>
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
    margin: 0,
    justifyContent: "center"
  }
});
