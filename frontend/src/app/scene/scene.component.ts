import { Component, OnInit } from '@angular/core';
import { ArtificialEnemyService } from '../services/artificial-enemy.service';


@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements OnInit {

  private pauseIcon = "../../assets/pause.svg";
  

  constructor(private aiEnemy: ArtificialEnemyService) { }

  ngOnInit() {

   
  }

}
