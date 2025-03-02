import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;
  passwordHidden: boolean = true;
  confirmPasswordHidden: boolean = true;

  btnLoad: boolean = false;
  phone: boolean = false;
  occupation: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    // private usersService: UsersService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.createForm();
  }
  createForm() {
  this.form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    occupation: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    status: ['', [Validators.required,]]
  }, { Validators: this.checkPasswords })
}

checkPasswords(group: FormGroup) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirm_password')?.value;

  return password === confirmPassword ? null : { notSame: true };

}

async registerUser() {
  console.log({ form: this.form.value });
  try {
    this.btnLoad = true;
    // await this.usersService.register(this.form.value);
    const userEmail = this.form.get('email')?.value;
    // this.router.navigate(['/verification-page'], { queryParams: { email: userEmail } });
  } catch (error) {
    this.btnLoad = false;
  }
}
}
