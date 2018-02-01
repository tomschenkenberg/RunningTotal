/* @flow */

import {
  observable,
  computed,
  toJS,
  useStrict,
  transaction,
  action,
  map,
  ObservableMap
} from "mobx";
import store from "react-native-simple-store";

// Nice colors for each player
const colorArr = [
  "#FFDEAD",
  "#98a2c4",
  "#b4daf8",
  "#b8B4a0",
  "#b14ad8",
  "#84da28",
  "#cccacc",
  "#4cccec",
  "#ccecc6"
];
var nextColorId = 0;
var nextPlayerId = 100;

//useStrict(true);

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
          console.log("KEY=" + player.name + ", " + player.bgcolor);
          const p = Player.deserialize(player);
          this.players.set(p.id,p);
        });
      }
    });

    //    this.addPlayer("Bono");
    //    this.addPlayer("Ghandi");
    //    this.addPlayer("Gandalf");
    //    this.addPlayer("Flipper");
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

  @computed
  get playerCount() {
    return this.players.size;
  }

  @action
  getPlayer(id: number): Player {
    return this.players.get(id);
  }

  @action
  deletePlayer(id: number) {
    store.delete(this.getPlayer(id).name);
    this.players.delete(id);
  }

  @action
  resetScores() {
    for (var v of this.players.values()) v.clearScores();
    this.saveToStorage();
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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// -----------------------------------------------------------------
export class Player {
  @observable id = null;
  @observable bgcolor = "";
  @observable name = "";
  @observable _scores = new Map();

  constructor(newid: number, name: string) {
    // Capatalize the first letter of the name, max 12 characters:
    this.name = name.charAt(0).toUpperCase() + name.substring(1, 12);
    this.id = newid;
    this.bgcolor = colorArr[nextColorId++];

    // Some random scores for debugging/development:
    //this.addScore(Math.floor(Math.random() * 20 + 1) * 5);
    //this.addScore(Math.floor(Math.random() * 60 + 1) * 5);
    //this.addScore(Math.floor(Math.random() * 15 + 1) * 5);
  }

  @action
  serialize() {
    return {
      bgcolor: this.bgcolor,
      name: this.name,
      scores: JSON.stringify([...this._scores])
    };
  }

  @action
  static deserialize(json): Player {
    const player = new Player(++nextPlayerId, json["name"]);
    player.bgcolor = json["bgcolor"];
    console.log(JSON.parse(json["scores"]));
    player._scores = new Map(JSON.parse(json["scores"]));
    return player;
  }

  @action
  addScore(score: number) {
    var newscore = isNumeric(score) ? parseInt(score) : 0;
    this._scores.set(this.scorecount + 1, newscore);
    this.save();
  }

  @action
  clearScores() {
    this._scores.clear();
  }

  @action
  deleteScore(key: number) {
    this._scores.delete(key);
  }

  @action
  save() {
    store.update(this.name, this.serialize());
  }

  @computed
  get totalscore(): number {
    var sum = 0;
    for (var v of this._scores.values()) sum += v;
    return sum;
  }

  @computed
  get scorecount(): number {
    return this._scores.size;
  }

  @computed
  get scores() {
    return this._scores.entries();
  }

  @computed
  get playername(): string {
    return this.name === undefined ? "Unknown" : this.name;
  }
}
