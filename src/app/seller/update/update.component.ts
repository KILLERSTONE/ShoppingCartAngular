import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'app/shared/types/book';
import { CurdService } from '../curd.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  book_id!: number;
  book: Book | null = null;
  updatedBook: Book | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private curdService: CurdService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params) {
        const idStr = params.get('id');
        if (idStr != null) {
          const id = parseInt(idStr, 10);
          if (!isNaN(id)) {
            this.book_id = id;
            this.book = this.curdService.getBookById(this.book_id);
            this.updatedBook = this.book ? { ...this.book } : null;
          }
        }
      }
    });
  }


  updateBook(): void {
    if (this.updatedBook) {
      this.curdService.updateBook(this.book_id, this.updatedBook);
      this.router.navigate(['/seller']);
    }
  }
}
