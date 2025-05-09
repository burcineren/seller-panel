import { Component } from '@angular/core';

import { LoginFormComponent } from "./components/login-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {

}