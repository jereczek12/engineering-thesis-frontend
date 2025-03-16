import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    isLoggedIn = false;
    username?: string;
  
    constructor(private authService: AuthenticationService, private snackBar: MatSnackBar) {}
  
    ngOnInit(): void {
      this.authService.currentUser.subscribe(user => {
        this.isLoggedIn = !!user;
        this.username = user ? user.username : '';
      });
    }

    logout(): void {
        this.authService.logout().subscribe(
            () => {
              this.snackBar.open('Logout successful', 'Close', { duration: 3000, verticalPosition: 'top' });
              // Additional logic after logout if necessary
            },
            error => {
              console.error('Logout error:', error);
              // Optionally handle logout error
            }
          );
      }

}
