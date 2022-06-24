import { Component, OnDestroy, OnInit,} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {  
  isAuthenticated = false;
  sub: Subscription;  

  constructor (private dataStorageService: DataStorageService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.sub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
      },
    });    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();  
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }  

  onSignout() {
    this.authService.signout();    
  }
}