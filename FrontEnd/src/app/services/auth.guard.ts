import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {}

  canActivate(): boolean {
    const token = this.user.validarToken();

    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
