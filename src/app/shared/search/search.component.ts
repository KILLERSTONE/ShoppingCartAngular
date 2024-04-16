import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { Book } from '../types/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy {
  private searchResultSubscription: Subscription | undefined;

  constructor(private searchService: SearchService) {}

  ngOnDestroy(): void {
    if (this.searchResultSubscription) {
      this.searchResultSubscription.unsubscribe();
    }
  }

  authorName: string = '';
  bookTitle: string = '';
  searchResult: Book[] = [];

  isLoading: boolean = false;

  searchBooks(): void {
    this.isLoading = true;
    
    this.searchResultSubscription = this.searchService
      .searchBooks(this.bookTitle , this.authorName) 
      .pipe(
        tap((result) => {
          this.isLoading = false;
          if (!this.bookTitle && !this.authorName) {
          } else {
          }
          this.searchResult = result;
        }),
        catchError(() => {
          this.isLoading = false;
          return [];
        })
      )
      .subscribe();
  }

  addToCart(book: Book): void {
    this.searchService.addToCart(book);
  }

  removeFromCart(book: Book): void {
    this.searchService.removeFromCart(book);
  }
}
