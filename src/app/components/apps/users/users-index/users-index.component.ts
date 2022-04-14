import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/api/user.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss']
})
export class UsersIndexComponent implements OnInit {
  users: any[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((res:any)=>{
      this.users = res?.result;
    }, (err:any)=>{

    });
  }

  deleteUser(id:any){
    this.userService.deletUser(id).subscribe((res:any)=>{
      this.loadUsers();
    }, (err:any)=>{

    });
  }

}
