import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://weed-406221.uc.r.appspot.com/'
 
  constructor(private http: HttpClient, private storageService: StorageService, public afAuth: AngularFireAuth, private toastr:ToastrService) {
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: firebase.auth.AuthProvider | GoogleAuthProvider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser(clientId: string): Promise<UserModel> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + '1234');
  
    return new Promise((resolve, reject) => {
      this.http.get<UserModel>(this.apiUrl + 'user/' + clientId, { headers: headers })
        .subscribe(
          (response: UserModel) => {
            
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
 

  

}
