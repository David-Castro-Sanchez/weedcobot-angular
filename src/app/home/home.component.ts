import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private afAuth: AngularFireAuth, private router: Router, private storageService: StorageService) {
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.storageService.isLoggedNext(false);
      localStorage.clear();
      this.router.navigate(['/']);
      
    })
  }

}
