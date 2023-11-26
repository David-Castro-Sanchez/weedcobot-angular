import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  changesForm: FormGroup;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private storageService: StorageService,
    private apiService:ApiService) {
      this.changesForm = this.fb.group({
        maximum_temperature: ['', [Validators.required]],
        minimum_temperature: ['', Validators.required],
        maximum_air_humidity: ['', [Validators.required]],
        minimum_air_humidity: ['', Validators.required],
        maximum_soil_humidity: ['', [Validators.required]],
        minimum_soil_humidity: ['', Validators.required]
      })
      apiService.getUser(this.storageService.SessionGetStorage("uid")).then(response => {
        
        this.changesForm.controls['maximum_temperature'].setValue(response.max_temperature);
        this.changesForm.controls['minimum_temperature'].setValue(response.min_temperature);
        this.changesForm.controls['maximum_air_humidity'].setValue(response.max_air_humidity);
        this.changesForm.controls['minimum_air_humidity'].setValue(response.min_air_humidity);
        this.changesForm.controls['maximum_soil_humidity'].setValue(response.max_soil_humidity);
        this.changesForm.controls['minimum_soil_humidity'].setValue(response.min_soil_humidity);

        storageService.SessionAddStorage("user",response);
      })

  }

  sendChanges() {
   let user:UserModel = this.storageService.SessionGetStorage("user");
   user.max_air_humidity = Number(this.changesForm.value.maximum_air_humidity);
   user.min_air_humidity = Number(this.changesForm.value.minimum_air_humidity);
   user.max_temperature = Number(this.changesForm.value.maximum_temperature);
   user.min_temperature = Number(this.changesForm.value.minimum_temperature);
   user.max_soil_humidity = Number(this.changesForm.value.maximum_soil_humidity);
   user.min_soil_humidity = Number(this.changesForm.value.minimum_soil_humidity);
   this.apiService.sendUser(user);
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
