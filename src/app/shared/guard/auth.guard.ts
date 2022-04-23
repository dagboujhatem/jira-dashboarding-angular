import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private toastr: ToastrService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // Guard for user is login or not
      let token = localStorage.getItem('token');
      if (token === null) {
        this.toastr.success("You are not allowed to access this URL!");
        this.router.navigate(['/auth/login'])
      }
      return true;
  }
  
}
