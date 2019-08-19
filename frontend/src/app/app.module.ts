import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { GameComponent } from './game/game.component';
import { MenuComponent } from './menu/menu.component';
import { SceneComponent } from './scene/scene.component';
import { ErrorComponent } from './error/error.component';
import { BattlefieldComponent } from './battlefield/battlefield.component';
import { AimDirective } from './aim.directive';
import { GameRouteReuseStrategy } from './route-reuse';


const gameRoutes: Routes = [
  {
    path: 'menu/:isNestedLevel',
    component: MenuComponent,
    children: [
      {
        path: 'player/:isEnemy',
        component: PlayerComponent
      }
    ]
  },
  {
    path: 'scene',
    component: SceneComponent
  }
];

const appRoutes: Routes = [
  {
    path: 'game/:state',
    component: GameComponent,
    children: gameRoutes
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  { path: '',   redirectTo: '/game/0', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    GameComponent,
    MenuComponent,
    SceneComponent,
    ErrorComponent,
    BattlefieldComponent,
    AimDirective 
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    {
			provide: RouteReuseStrategy,
			useClass: GameRouteReuseStrategy
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
