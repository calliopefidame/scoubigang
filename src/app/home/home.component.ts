import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GlobalConstants } from '../common/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isConnected:boolean = false;
  username:string = '';
  constructor(private authservice : AuthService) { }

  ngOnInit(): void {
    this.isConnected = this.authservice.isLoggedIn;
    this.username = this.authservice.username;
  }

}
