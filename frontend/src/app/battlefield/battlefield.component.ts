import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Battlefield } from '../models/battlefield';
import { ArtificialEnemyService } from '../services/artificial-enemy.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css'],
})
export class BattlefieldComponent implements OnInit, OnDestroy {

  @Input() id: number;
  @Input() isEnemy: boolean;

  private abscissaPoints = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'];
  private ordinatePoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private fieldModel: Battlefield;
  private matrix: number[][];
  private disabled: boolean = false;
  private matrixUpdateSub$: Subscription;
  private stepOwnerSub$: Subscription;
  // private aiEnemy: ArtificialEnemyService

  constructor(private aiEnemy: ArtificialEnemyService) { 

  }

  onSelected(cell: string){
    let cellArr = cell.split(";"),
      targetX = parseFloat(cellArr[0]),
      targetY = parseFloat(cellArr[1]);

    this.fieldModel.strike(targetX, targetY);
    this.aiEnemy.isStepOwner$.next(true);
  }

  ngOnInit() {
    this.fieldModel = new Battlefield(this.id);
    this.matrix = this.fieldModel.makeSquadronOnField();

    this.matrixUpdateSub$ = this.fieldModel.matrixUpdate$.subscribe(update => {
      if (update) this.matrix[update['targetY']][update['tergetX']] = update['cellState'];
    });
    
    if (!this.isEnemy) {
      this.aiEnemy.playerField = this.fieldModel;
    }
    
    if (this.isEnemy) {
      this.stepOwnerSub$ = this.aiEnemy.isStepOwner$.subscribe(isOwnerEnemy => {
        let targetX, targetY;
        
        this.disabled = isOwnerEnemy;
        if (isOwnerEnemy) {
          targetX = Math.floor(Math.random() * 10);
          targetY = Math.floor(Math.random() * 10);

          setTimeout(() => {
            this.aiEnemy.strikeToPlayer(targetX, targetY);
          }, 3000);
        }
        
      });
    }
    
  }

  ngOnDestroy() {
    this.matrixUpdateSub$.unsubscribe();
    if (this.isEnemy) {
      this.stepOwnerSub$.unsubscribe();
    }
  }

}
