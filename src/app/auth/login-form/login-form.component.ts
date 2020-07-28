import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  

  constructor(
    private readonly authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe();
  }

}
