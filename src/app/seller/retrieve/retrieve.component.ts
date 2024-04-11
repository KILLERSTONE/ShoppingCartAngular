import { Component, OnInit } from '@angular/core';
import { CurdService } from '../curd.service';
import { Book } from 'app/shared/types/book';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrl: './retrieve.component.css'
})
export class RetrieveComponent implements OnInit{

  constructor(private curdServices:CurdService){}

  books:Book[]=[];

  ngOnInit():void{
    this.books=this.curdServices.books;
  }
}
