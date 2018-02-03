/* @flow */

import {
  observable,
  computed,
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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// -----------------------------------------------------------------
export default class Player {
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
      name: this.name,
      scores: JSON.stringify([...this._scores])
    };
  }

  @action
  static deserialize(json, id): Player {
    const player = new Player(id, json["name"]);
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
    this.save();
  }

  @action
  deleteScore(key: number) {
    this._scores.delete(key);
    this.save();
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
