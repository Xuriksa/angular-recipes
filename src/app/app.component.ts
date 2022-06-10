import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activePage: string;

  constructor() {
    this.activePage = "Recipes";
  }

  navigate(path: string) {
    this.activePage = path;
  }
}
