import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/api/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public editProfile: FormGroup;
  submitted = false;

  constructor(private userService: UserService,
    private toasterService: ToastrService,
    private router: Router,) { }

  ngOnInit(): void {
    this.editProfile = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', []),
    });
    this.editProfile.get("password").valueChanges.subscribe(newValue => {
      if(newValue != ""){
        this.editProfile.get("password").setValidators([Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]);
        this.editProfile.addControl("passwordConfirmation", new FormControl('', [Validators.required,
          RxwebValidators.compare({fieldName:'password' })]));
      }else{
        this.editProfile.get("password").setValidators([]);
        this.editProfile.removeControl("passwordConfirmation");
      }
   });
    this.loadProfileData();
  }

  loadProfileData(){
    this.userService.getProfile().subscribe((response: any) => {
      // delete the password 
      delete response?.result?.password;
      // show data in the form
      this.editProfile.patchValue(response?.result)
    }, (error: any) => {
      this.toasterService.error('', error?.error?.message);
    });
  }

  saveUpdate(){
    this.submitted = true;
    if (this.editProfile.invalid) {
      return;
    }
    this.userService.updateProfile(this.editProfile.value).subscribe((response: any) => {
      this.toasterService.success('', response?.message);
      this.router.navigateByUrl('/user/profile');
    }, (error: any) => {
      this.toasterService.error('', error?.error?.message);
    });
  }

}
