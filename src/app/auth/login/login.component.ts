import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(public authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

  // Login request 
  login() {
    this.authService.login(this.loginForm.value).subscribe((res:any)=>{
      localStorage.setItem('token', res?.result?.token);
      this.router.navigate(['/dashboard/default']);
    }, (err:any)=>{

    });
  }

}
