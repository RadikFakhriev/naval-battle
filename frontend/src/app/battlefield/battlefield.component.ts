import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ArtificialEnemyService } from '../services/artificial-enemy.service';
import { Subscription } from 'rxjs';
import { BattlefieldService } from '../services/battlefield.service';
import { GameService } from '../services/game.service';


@Component({
  selector: 'battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css'],
  providers: [BattlefieldService]
})
export class BattlefieldComponent implements OnInit, OnDestroy {

  @Input() isEnemy: boolean;

  private abscissaPoints = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'];
  private ordinatePoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private matrix: number[][];
  private disabled: boolean = false;
  private matrixUpdateSub: Subscription;
  private stepOwnerSub: Subscription;

  constructor(private battlefield: BattlefieldService,
              private gameService: GameService,
              private aiEnemy: ArtificialEnemyService) { 

  }

  onSelected(cell: string){
    let cellArr = cell.split(";"),
      targetX = parseFloat(cellArr[0]),
      targetY = parseFloat(cellArr[1]),
      cellState = parseFloat(cellArr[2]),
      isHit;

    if (cellState > 1) {
      alert("Ты уже стрелял сюда! Выбери другую ячейку!");
      return;
    }
    isHit = this.battlefield.strike(targetX, targetY);
    if (isHit) this.aiEnemy.isStepOwner$.next(false);
    else this.aiEnemy.isStepOwner$.next(true);
  }


  ngOnInit() {
    this.matrix = this.battlefield.makeSquadronOnField();

    this.matrixUpdateSub = this.battlefield.matrixUpdate$.subscribe(update => {
      if (update) this.matrix[update['targetY']][update['tergetX']] = update['cellState'];
    });

    this.battlefield.isDefeated$.subscribe(isDefeat => {
      if (isDefeat) {
        // TODO: set stop aiEnemy
        this.gameService.setWinner(!this.isEnemy);
      }
    });
    
    if (this.isEnemy) {
      this.stepOwnerSub = this.aiEnemy.isStepOwner$.subscribe(isOwnerEnemy => {
        this.disabled = isOwnerEnemy;

        if (isOwnerEnemy) {
            this.aiEnemy.strikeToPlayer();
        }
      });
    } else {
      this.aiEnemy.playerField = this.battlefield;
    }
    
  }

  ngOnDestroy() {
    this.matrixUpdateSub.unsubscribe();
    if (this.isEnemy) {
      this.stepOwnerSub.unsubscribe();
    }
  }

}
