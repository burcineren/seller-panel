import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) { }

  login() {
    if (this.email === 'admin@example.com' && this.password === '123456') {
      // Örnek giriş doğrulaması
      this.router.navigate(['/']);
    } else {
      alert('Hatalı kullanıcı adı veya şifre');
    }
  }
}