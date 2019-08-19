import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from "rxjs";
import { BattlefieldService } from '../services/battlefield.service';

@Injectable({
  providedIn: 'root'
})
export class ArtificialEnemyService {

  public isStepOwner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public playerField: BattlefieldService;

  constructor() {
    
  }

  getRandomTarget() {

  }

  strikeToPlayer() {
    let targetX, 
        targetY,
        decisionTime = Math.floor(Math.random() * 3000),
        isHit;

    // подбираем "нестреленную" ячейку
    do{
      targetX = Math.floor(Math.random() * 10);
      targetY = Math.floor(Math.random() * 10);
    } while(this.playerField.matrix[targetY][targetX] > 1)
    
    setTimeout(() => {
      isHit = this.playerField.strike(targetX, targetY);
      isHit ? this.isStepOwner$.next(true) : this.isStepOwner$.next(false);
    }, decisionTime);

    if (isHit) this.strikeToPlayer();
    
  }

}
