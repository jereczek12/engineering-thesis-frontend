import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/service/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService) { }

  onRegister() {
    this.authenticationService.register(this.username, this.password).subscribe(
      data => {
        console.log('Registration successful', data);
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}