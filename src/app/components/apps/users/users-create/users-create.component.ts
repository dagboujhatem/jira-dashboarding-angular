import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/api/user.service';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
  public editProfile: FormGroup;

  constructor(private fb: FormBuilder,
     private userService: UserService,
     private router: Router) { }

  ngOnInit(): void {
    this.editProfile = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.email],
      role: [''],
      password: [''],
    })
  }

  addNewUser(){
    this.userService.addUser(this.editProfile.value).subscribe((res:any)=>{
      this.router.navigateByUrl('/user/index');
    }, (err:any)=>{

    });
  }

}
