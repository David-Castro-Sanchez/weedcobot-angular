import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private afAuth: AngularFireAuth, private router: Router, private storageService: StorageService,
    private apiService:ApiService) {

      apiService.getUser(this.storageService.SessionGetStorage("uid")).then(response => {

        storageService.SessionAddStorage("user",response);
      })
    
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.storageService.isLoggedNext(false);
      localStorage.clear();
      this.storageService.SessionClear();
      this.router.navigate(['/']);
      
    })
  }

}
