import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class PriceGuard implements CanActivate {

  constructor(private router: Router, private data: DataService) {}

  canActivate(): boolean {

    if(this.data.total !== 0) {
        return true;
    }
    else {
        this.router.navigate(['/']);
        return false;
    }

  }

}