import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckersBoardComponent } from './components/game/checkers-board/checkers-board.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GameHistoryComponent } from './components/game-history/game-history.component';

const routes: Routes = [
  { path: 'gameplay/:gameID', component: CheckersBoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MainPageComponent},
  { path: 'history', component: GameHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
