import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import from compat module
import { User } from 'firebase/auth'; // Correct import path for User
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listAllUsers();
  }

  listAllUsers(): void {
    this.http.get<any[]>('YOUR_CLOUD_FUNCTION_ENDPOINT')
      .subscribe({
        next: (users) => {
          console.log('Users:', users);
          this.users = users;
        },
        error: (error) => {
          console.error('Error listing users:', error);
        }
      });
  }

}
