import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/firebase/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(public authService: AuthService,
      private router: Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

}
