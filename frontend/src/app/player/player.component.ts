import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {

  isEnemy: boolean = false;
  playerForm: FormGroup;
  private activationRouteSub: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private gameService: GameService) { 
    this.createForm();
  }

  createForm() {
    this.playerForm = this.formBuilder.group({
      playerName: new FormControl('', [ Validators.required, Validators.minLength(2), Validators.maxLength(64) ]),
    });
  }

  addPlayer(playerName: string) {
    this.createForm();
    this.gameService.addPlayer(playerName, this.isEnemy);
  }

  ngOnInit() {
    this.activationRouteSub = this.activatedRoute.params.subscribe(params => {
      this.isEnemy = Boolean(parseFloat(params['isEnemy']));
    });
  }

  ngOnDestroy() {
    this.activationRouteSub.unsubscribe();
  }

}
