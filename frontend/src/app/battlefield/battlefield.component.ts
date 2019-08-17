import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  private abscissaPoints = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'к'];
  private ordinatePoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() { }

  onSelected(cell: string){
    alert(cell);
  }

  makeShipLocations() {

  }

  ngOnInit() {
  }

}
