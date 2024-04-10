import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{


  users$:Observable<User[]>
  
}
