import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/api/user.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
  public userForm: FormGroup;
  submitted = false;
  currentFile: any;
  constructor(private userService: UserService,
    private toasterService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]),
      passwordConfirmation: new FormControl('', [Validators.required,
        RxwebValidators.compare({fieldName:'password' })])
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.currentFile = file
    }
  }

  addNewUser() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    let formData: any = new FormData()
    if (this.currentFile) {
      formData.append("file", this.currentFile, this.currentFile.name);
      this.userService.uploadAvatar(formData).subscribe((res: any) => {
        const userForm = this.userForm.value;
        userForm['avatar'] = res?.result;
        this.addUser(userForm);
      }, (error: any) => {
        this.toasterService.error('', error?.error?.message);
      });
    } else {
      const userForm = this.userForm.value;
      userForm['avatar'] = 'defualt';
      this.addUser(userForm);
    }
  }

  addUser(userForm: any) {
    this.userService.addUser(userForm).subscribe((response: any) => {
      this.toasterService.success('', response?.message);
      this.router.navigateByUrl('/user/index');
    }, (error: any) => {
      this.toasterService.error('', error?.error?.message);
    });
  }

}
