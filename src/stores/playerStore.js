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
import { persist } from "mobx-persist";

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

useStrict(true);

// -----------------------------------------------------------------
export default class PlayerStore {
  @persist("map")
  @observable
  players = new Map();

  @persist
  @observable
  nextPlayerId = 100;

  constructor() {
    this.loadPlayers();
  }

  @action
  loadPlayers() {
    this.addPlayer("Bono");
    this.addPlayer("Ghandi");
    this.addPlayer("Gandalf");
    this.addPlayer("Flipper");
  }

  @action
  addPlayer(name: string) {
    const newid = this.nextPlayerId++;
    this.players.set(newid, new Player(newid, name));
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
    this.players.delete(id);
  }

  @action
  resetScores() {
    for (var v of this.players.values()) v.clearScores();
  }

  @action
  getSortedArray(): Array {
    var datalist = [];

    for (var v of this.players.values()) {
      part = toJS(v);

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
  @persist
  @observable
  id = null;
  @persist
  @observable
  bgcolor = "";
  @persist
  @observable
  name = "";

  @persist("map")
  @observable
  _scores = new Map();

  constructor(newid: number, name: string) {
    // Capatalize the first letter of the name, max 12 characters:
    this.name = name.charAt(0).toUpperCase() + name.substring(1, 12);
    this.id = newid;
    this.bgcolor = colorArr[nextColorId++];

    // Some random scores for debugging/development:
    this.addScore(Math.floor(Math.random() * 20 + 1) * 5);
    this.addScore(Math.floor(Math.random() * 60 + 1) * 5);
    this.addScore(Math.floor(Math.random() * 15 + 1) * 5);
  }

  @action
  addScore(score: number) {
    var newscore = isNumeric(score) ? parseInt(score) : 0;
    this._scores.set(this.scorecount + 1, newscore);
  }

  @action
  clearScores() {
    this._scores.clear();
  }

  @action
  deleteScore(key: number) {
    this._scores.delete(key);
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
