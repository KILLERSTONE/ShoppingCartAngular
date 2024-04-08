import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase.config';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day1-app';

  ngOnInit(){
    //initialize firebase
    initializeApp(firebaseConfig);

  }

}
