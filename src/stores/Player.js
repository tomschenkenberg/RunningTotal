/* @flow */

import { observable, computed, action, map, ObservableMap } from "mobx";
import store from "react-native-simple-store";

function isNumeric(n: any): boolean {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// -----------------------------------------------------------------
export default class Player {
  @observable id: number = null;
  @observable name: string = "";
  @observable _scores = new Map();

  constructor(newid: number, name: string) {
    // capatalize the first letter of the name, max 12 characters:
    this.name = name.charAt(0).toUpperCase() + name.substring(1, 12);
    this.id = newid;
  }

  @action
  serialize(): any {
    return {
      name: this.name,
      scores: JSON.stringify([...this._scores])
    };
  }

  @action
  static deserialize(json: any, id: number): Player {
    /* tslint:disable:no-string-literal */
    const player: Player = new Player(id, json["name"]);
    player._scores = new Map(JSON.parse(json["scores"]));
    /* tslint:enable:no-string-literal */

    return player;
  }

  @action
  addScore(score: number): void {
    // For some reason score is a string, and this is how you apparently fix that
    var newscore = isNumeric(score) ? parseInt(score, 10) : 0;

    this._scores.set(this.scorecount + 1, newscore);
    this.save();
  }

  @action
  clearScores(): void {
    this._scores.clear();
    this.save();
  }

  @action
  deleteScore(key: number): void {
    this._scores.delete(key);
    this.save();
  }

  @action
  save(): void {
    store.update(this.name, this.serialize());
  }

  @computed
  get totalscore(): number {
    var sum: number = 0;
    for (var v of this._scores.values()) {
      sum += v;
    }
    return sum;
  }

  /* Returns the number of recorded scores */
  @computed
  get scorecount(): number {
    return this._scores.size;
  }

  @computed
  get scores(): IterableIterator<[number, number]> {
    return this._scores.entries();
  }

  @computed
  get playername(): string {
    return this.name === undefined ? "Unknown" : this.name;
  }
}
