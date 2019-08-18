import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from "rxjs";
import { Battlefield } from '../models/battlefield';

@Injectable({
  providedIn: 'root'
})
export class ArtificialEnemyService {

  public isStepOwner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public playerField: Battlefield;

  constructor() {
    
    console.log('АДЫН!');
  }

  strikeToPlayer(targetX, targetY) {
    this.isStepOwner$.next(false);
    return this.playerField.strike(targetX, targetY);
  }

}
