import { Injectable } from '@angular/core';
import { Book } from '../../shared/types/book';
import { Observable, map, of } from 'rxjs';

@Injectable()


export class BookService {

  getLocalBooks():Observable<Book[]>{
    const localBooks=localStorage.getItem('books');
    if(localBooks) return of(JSON.parse(localBooks));
    else return of([]);
  }

  retrieveBooks():Book[]{
    this.getLocalBooks().subscribe(
      (books:Book[])=>{
        return books;
      }
    );
    return [];
  }
  setLocalBooks(books:Book[]){
    localStorage.setItem('books',JSON.stringify(books));
  }
  constructor() { }

  getBooks():Book[]{
    const localBooks=localStorage.getItem('books');
    if(localBooks) return JSON.parse(localBooks);
    return  [
      {
        id:1,
        name: 'Clean Code',
        author: 'Robert C. Martin',
        src: 'https://m.media-amazon.com/images/I/41bOkXnNBjL._SY445_SX342_.jpg',
        amount: 500,
      },
      {
        id:2,
        name: 'The Pragmatic Programmer',
        author: 'Andrew Hunt, David Thomas',
        src: 'https://m.media-amazon.com/images/I/518FqJvR9aL.jpg',
        amount: 600,
      },
      {
        id:3,
        name: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        src: 'https://m.media-amazon.com/images/I/51p1h1Xl7WL._AC_UF1000,1000_QL80_.jpg',
        amount: 700,
      },
      {
        id:4,
        name: 'Refactoring: Improving the Design of Existing Code',
        author: 'Martin Fowler',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbUmJ06FGqtU3pl_BudvfiBLK1sgboatcv3LzWg1_Wg&s',
        amount: 550,
      },
      {
        id:5,
        name: 'Domain-Driven Design: Tackling Complexity in the Heart of Software',
        author: 'Eric Evans',
        src: 'https://m.media-amazon.com/images/I/71Qde+ZerdL._AC_UF350,350_QL50_.jpg',
        amount: 650,
      },
    ];
  }






}
