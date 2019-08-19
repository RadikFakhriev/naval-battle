import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  state: number = 0;
  private activationRouteSub: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // TODO:
    // CheckGameStatus
    // if paused,closed,created and doesn't have gameId navigate to menu
    // else to scene
    this.router.navigate(['menu', 0], { relativeTo: this.activatedRoute });
    
    this.activatedRoute.params.subscribe(params => {
      this.state = parseFloat(params['state']);
      switch (this.state) {
        case 0: //unknown
          break;
        case 1: //created
          break;
        case 2: //paused
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
