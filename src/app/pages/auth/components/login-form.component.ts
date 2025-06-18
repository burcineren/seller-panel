import { Component, signal, inject, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthHandlerService } from '../../../core/services/auth-handler.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private fb = inject(FormBuilder);
  authHandlerService = inject(AuthHandlerService);


  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading = signal(false);
  error = signal<string | null>(null);


  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { username, password } = this.loginForm.value;

    this.authHandlerService.login(username!, password!).subscribe({

    })
  }

}