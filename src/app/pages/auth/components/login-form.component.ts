import { Component, signal, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { RedirectService } from '../../../core/services/redirect.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  private loginSvc = inject(LoginService);
  private router = inject(Router);
  private redirectSvc = inject(RedirectService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  loading = signal(false);
  error = signal<string | null>(null);

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.loginForm.value;

    this.loginSvc
      .loginWithCredentials(email!, password!)
      .subscribe({
        next: user => {
          this.loading.set(false);

          const target = '/dashboard';
          this.router.navigate([target]).then(() => {

            this.redirectSvc.setUrl('/dashboard');
          });
        },
        error: err => {
          this.loading.set(false);
          this.error.set(err?.message || 'Giriş yapılamadı');
        }
      });
  }
}