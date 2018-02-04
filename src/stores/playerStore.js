/* @flow */

import {
  observable,
  computed,
  toJS,
  transaction,
  action,
  map,
  ObservableMap
} from "mobx";
import store from "react-native-simple-store";
import Player from "./Player";

var nextPlayerId = 100;

// -----------------------------------------------------------------
export default class PlayerStore {
  @observable players = new Map();

  constructor() {
    this.loadFromStorage();
  }

  @action
  async loadFromStorage() {
    store.keys().then(keys => {
      for (var playername of keys) {
        store.get(playername).then(player => {
          //console.log("KEY=" + player.name + ", " + player.bgcolor);
          const p = Player.deserialize(player, ++nextPlayerId);
          this.players.set(p.id, p);
        });
      }
    });
  }

  @action
  saveToStorage() {
    for (var v of this.players.values()) {
      v.save();
    }
  }

  @action
  addPlayer(name: string): number {
    const newid = ++nextPlayerId;
    const player = new Player(newid, name);
    player.save();
    this.players.set(newid, player);
    return newid;
  }

  @action
  getPlayer(id: number): Player {
    return this.players.get(id);
  }

  @action
  getPlayerByName(name: string): Player {
    for (var v of this.players.values()) {
      if (v.name.toUpperCase() === name.toUpperCase()) return v;
    }
    return undefined;
  }

  @action
  deletePlayer(id: number) {
    store.delete(this.getPlayer(id).name);
    this.players.delete(id);
  }

  @action
  resetScores() {
    for (var v of this.players.values()) v.clearScores();
  }

  @action
  playerExists(name: string): boolean {
    for (var v of this.players.values()) {
      if (v.name.toUpperCase() === name.toUpperCase()) return true;
    }
    return false;
  }

  isHighestScoreCount(id: number): boolean {
    // Find out if player has the highest scorecount
    const playerscorecount = this.getPlayer(id).scorecount;
    var highestscorecount = 0;
    for (var v of this.players.values()) {
      if (v.scorecount > highestscorecount) highestscorecount = v.scorecount;
    }
    return playerscorecount >= highestscorecount;
  }

  @computed
  get playerCount(): number {
    return this.players.size;
  }

  @computed
  get SortedArray(): Array {
    var datalist = [];

    for (var v of this.players.values()) {
      var part = toJS(v);

      // add a totalscore property into the array
      var sum = 0;
      for (var i in part._scores) {
        sum += part._scores[i];
      }
      part.totscore = sum;
      datalist.push(part);
    }

    // Then sort it with the totalscore prop
    datalist.sort(function(a, b) {
      return b.totscore - a.totscore;
    });

    return datalist;
  }
}
