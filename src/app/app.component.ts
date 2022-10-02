import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scoubigang';
  isAuthenticated: boolean = false;
  userName: any = 'Anonyme';

  constructor() {
  }

  async ngOnInit() {
  }
}
