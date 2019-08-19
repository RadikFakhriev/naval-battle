import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ArtificialEnemyService } from '../services/artificial-enemy.service';
import { GameService } from '../services/game.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit, OnDestroy {

  private pauseIcon = "../../assets/pause.svg";
  private message = "";
  private finalMessage
  private finalTitle;
  private lastPlayerName;
  private stepOwnerSub: Subscription;
  private hasWinnerSub: Subscription;
  @ViewChild('finalModal') finalModal;

  constructor(private aiEnemy: ArtificialEnemyService,
              private gameService: GameService) { }

  openModal() {
    this.finalModal.nativeElement.className = 'modal fade show final-modal--show';
  }
  closeModal() {
    this.finalModal.nativeElement.className = 'modal hide';
  }

  ngOnInit() {

    this.stepOwnerSub = this.aiEnemy.isStepOwner$.subscribe(isEnemyOwner => {
      let playerName,
          prefix = "";

      if (isEnemyOwner) {
        playerName = this.gameService.getEnemyName();
      } else {
        playerName = this.gameService.getPlayerName();
      }

      if (playerName === this.lastPlayerName) {
        prefix = "Дополнительный <br/>"
      }

      this.message = prefix + `Ход игрока ${playerName}`;

      this.lastPlayerName = playerName;
    });

    this.hasWinnerSub = this.gameService.isEnemyWinner$.pipe(filter(isEnemyWinner => isEnemyWinner != null)).subscribe(isEnemyWinner => {

      if (isEnemyWinner) {
        this.finalTitle = "Поражение!"
        this.finalMessage = "Ваш соперник оказался сильнее :("
      } else {
        this.finalTitle = "Победа!"
        this.finalMessage = "Поздравляем! <br/> Вы одержали победу!";
      }

      this.openModal();
    });
  }

  ngOnDestroy() {
    this.stepOwnerSub.unsubscribe();
    this.hasWinnerSub.unsubscribe();
  }

}
