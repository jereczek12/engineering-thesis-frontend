import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService, private snackBar:MatSnackBar) { }

  onLogin() {
    this.authenticationService.login(this.username, this.password).subscribe(
      data => {
        this.snackBar.open('Login successful', 'Close', { duration: 3000, verticalPosition: 'top' });
      },
      error => {
        console.error('Login failed', error);
        this.snackBar.open('Login failed', 'Close', { duration: 3000, verticalPosition: 'top' });
      }
    );
  }
}
