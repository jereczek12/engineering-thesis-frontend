import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckersBoardComponent } from './components/game/checkers-board/checkers-board.component';
import { HttpClientModule } from '@angular/common/http';
import { SquareComponent } from './components/game/square/square.component';
import { PieceComponent } from './components/game/piece/piece.component';
import { BoardComponent } from './components/game/board/board.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TipsComponent } from './components/game/tips/tips.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CpuDialogComponent } from './components/main-page/dialogs/cpu-dialog/cpu-dialog.component';
import { EvaluationBarComponent } from './components/game/evaluation-bar/evaluation-bar.component';
import { TimerBarComponent } from './components/game/timer-bar/timer-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GameHistoryComponent } from './components/game-history/game-history.component';
import { MatTableModule } from '@angular/material/table';
import { ConnectDialogComponent } from './components/main-page/dialogs/connect-dialog/connect-dialog.component';
import { ShareGameComponent } from './components/game/share-game/share-game.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TurnDisplayComponent } from './components/game/turn-display/turn-display.component';


@NgModule({
  declarations: [
    AppComponent,
    CheckersBoardComponent,
    SquareComponent,
    PieceComponent,
    BoardComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    NavbarComponent,
    TipsComponent,
    CpuDialogComponent,
    EvaluationBarComponent,
    TimerBarComponent,
    GameHistoryComponent,
    ConnectDialogComponent,
    ShareGameComponent,
    TurnDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
