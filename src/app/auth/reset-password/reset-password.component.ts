import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/api/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public show: boolean = false;
  public showConfirmation: boolean = false;
  public resetPasswordForm: FormGroup;
  public showLoader: boolean = false;

  constructor(private toastr: ToastrService,
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    this.resetPasswordForm = new FormGroup({
      token: new FormControl(token),
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  showPasswordConfirmation() {
    this.showConfirmation = !this.showConfirmation;
  }

  // Reset password request 
  resetPassword() {
    this.showLoader = true;
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe((response:any)=>{
      this.showLoader = false;
      this.toastr.success("", response?.message);
      this.router.navigate(['/auth/login']);
    }, (error:any)=>{
      this.showLoader = false;
      this.toastr.error("", error?.error?.message);
    });
  }
}
