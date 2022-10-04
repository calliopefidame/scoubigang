import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import{ GlobalConstants } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scoubigang';

  constructor(private authservice: AuthService) {
  }

  async ngOnInit() {
  }
}
