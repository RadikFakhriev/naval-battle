import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { GameService, GameStatus } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  state: number = 0;
  private activationRouteSub: Subscription;

  constructor(private router: Router,
              private gameService: GameService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // TODO:
    // CheckGameStatus
    // if paused,closed,created and doesn't have gameId navigate to menu
    // else to scene
    this.router.navigate(['menu', GameStatus.unknown], { relativeTo: this.activatedRoute });
    
    this.activatedRoute.params.subscribe(params => {
      this.state = parseFloat(params['state']);
      this.gameService.status = this.state;

      switch (this.state) {
        case GameStatus.unknown:
          break;
        case GameStatus.created:
          break;
        case GameStatus.paused:
          break;
        default:
          return;
      }

    });
  }

  ngOnDestroy() {
    this.activationRouteSub.unsubscribe();
  }

}
