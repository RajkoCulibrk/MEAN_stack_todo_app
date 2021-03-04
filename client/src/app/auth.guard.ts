import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProviderService } from './provider.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private provider: ProviderService, private router: Router) {}
  canActivate(): boolean {
    if (this.provider.user) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
