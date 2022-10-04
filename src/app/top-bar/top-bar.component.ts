import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isConnected : boolean = false;

  constructor(private authService : AuthService, private router : Router) { 
  }

  ngOnInit(): void {
    this.authService.isLoggedInChange.subscribe(isLoggedIn => {
      if (isLoggedIn){
        console.log(`TopBarComponent : est connecté ? : ${isLoggedIn}.`);
        this.isConnected = isLoggedIn;
      }
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }
}
