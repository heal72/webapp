import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
