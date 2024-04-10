import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Observable, Subscription } from 'rxjs';
import { Book } from '../types/book';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnDestroy {
  constructor(private searchService: SearchService) {}
  private searchResultSubscription: Subscription = new Subscription();

  ngOnDestroy(): void {
    this.searchResultSubscription.unsubscribe();
  }


  searchQuery: string | undefined;
  searchResult$: Book[] | undefined;

  isLoading: boolean = false;
  noResult: boolean = false;

  searchBooks(): void {
    if (!this.searchQuery) {
      this.searchResult$ = undefined;
      this.noResult = false;
      return;
    }

    this.isLoading = true;

    this.searchResultSubscription = this.searchService
      .searchBooks(this.searchQuery)
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.noResult = false;
        }),
        catchError(() => {
          this.isLoading = false;
          this.noResult = true;
          return [];
        })
      )
      .subscribe((result) => {
        this.searchResult$ = result;
      });
  }
}
