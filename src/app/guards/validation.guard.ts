import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    
    if(localStorage.getItem('Validation') == 'fzx') {
        return true;
    }
    else {
        this.router.navigate(['/form']);
        return false;
    }

  }

}