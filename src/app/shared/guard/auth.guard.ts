import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Guard for user is login or not
    const token = this.authService.getToken();
    if (token) {
      const isexpired = this.authService.isExpiredToken(token)
      if (!isexpired) {
        return true
      } else {
        this.toastr.error('Votre session a été expiré. Merci de refaire le login pour accéder à votre espace.',
          'La session a été expiré.');
        localStorage.clear();
        this.router.navigate(['/auth/login'])
        return false;
      }
    } else {
      this.router.navigate(['/auth/login'])
      return false;
    }
  }
}
