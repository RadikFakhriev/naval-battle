import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  private pauseIcon = "../../assets/pause.svg";

  constructor() { }

  ngOnInit() {
  }

}
