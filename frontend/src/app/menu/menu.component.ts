import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from "@angular/router";
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private isPause: boolean = false;
  private isNestedLevel: boolean = false;
  //private sceneInst: SceneComponent;
  private routeParamSub: Subscription;
  private parentRouteParamSub: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _location: Location) { }

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    // TODO: на случай повторного начала игры. Избавление от route-reuse по условию 
    // this.router.events.pipe(filter((event) => event instanceof ActivationEnd)).subscribe((e: ActivationEnd) => {
		// 	let activatedRouteComponent: any = e.snapshot.component;
    //   let activatedPath = e.snapshot.routeConfig.path;
    // });

    this.routeParamSub = this.activatedRoute.params.subscribe(params => {
      this.isNestedLevel = Boolean(parseFloat(params['isNestedLevel']));

    });

    this.parentRouteParamSub = this.activatedRoute.parent.params.subscribe(params =>{
      this.isPause = parseFloat(params['state']) === 2; // 2 - состояние game: ПАУЗА
    });
  }


  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
    this.parentRouteParamSub.unsubscribe();
  }

  // не срабатывает для сохраненных роутов из reuse-strategy
	// onActivate (activatedRouteComponent) {
	// 	if (activatedRouteComponent instanceof SceneComponent) {
	// 		this.sceneInst = activatedRouteComponent;
	// 	}
	// }

}
