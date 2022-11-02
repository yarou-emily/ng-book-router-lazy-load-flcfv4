import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  readonly form = this.fb.group({
    id: this.fb.control(''),
    password: this.fb.control(''),
  });

  get id(): FormControl {
    return this.form.get('id') as FormControl;
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  onLogin(): void {
    this.router.navigate(['platform', 'main']);
  }
}
