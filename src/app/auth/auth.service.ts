import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class AuthService {

  constructor(private router: Router, @Optional() @SkipSelf() sharedService?: AuthService) { 
    if(sharedService){
      throw new Error('AuthentificationService is already loaded');
    }

    this.isLoggedInChange.subscribe((value) => {
      this.isLoggedIn = value
    });
  }

  isLoggedIn = false;
  isLoggedInChange: Subject<boolean> = new Subject<boolean>();
  username:string = "anonyme";

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(l_username:string){
    this.isLoggedInChange.next(true);
    this.username = l_username;
  }

  logout() {
    this.isLoggedInChange.next(false);
    console.log(this.isLoggedIn);
    this.username = 'anonyme';
  }
}

