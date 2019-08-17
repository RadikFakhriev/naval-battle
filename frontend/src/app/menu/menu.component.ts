import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private isPause: boolean = false;
  private isNestedLevel: boolean = false;
  private routeParamSub: Subscription;
  private parentRouteParamSub: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _location: Location) { }

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    
    //TODO: if game in pause change state menu 
    this.routeParamSub = this.activatedRoute.params.subscribe(params => {
      this.isNestedLevel = Boolean(parseFloat(params['isNestedLevel']));

    });

    this.parentRouteParamSub = this.activatedRoute.parent.params.subscribe(params =>{
      this.isPause = parseFloat(params['state']) === 2;
    });
  }


  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
    this.parentRouteParamSub.unsubscribe();
  }

}
