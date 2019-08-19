import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private players: Array<Player> = [];
  public isEnemyWinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor() { }

  addPlayer(name: string, isEnemy: boolean) {
    this.players.push(new Player(name, isEnemy));
  }

  getEnemyName() {
    let enemy = this.players.filter(pl => pl.isEnemy)[0];
    return enemy ? enemy.name : '';
  }

  getPlayerName() {
    let player = this.players.filter(pl => !pl.isEnemy)[0];
    return player ? player.name : '';
  }

  setWinner(isEnemy) {
    this.isEnemyWinner$.next(isEnemy);
  }
}
