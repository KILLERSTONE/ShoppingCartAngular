import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'app/shared/types/book';
import { CurdService } from '../curd.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  book_id!: number;
  book: Book | null=null;

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
            console.log(this.book);
          } else {
          }
        } else {
        }
      } else {
      }
    });
  }



  deleteBook(): void {

    if(this.book_id!=null)this.curdService.removeBook(this.book_id);
    this.router.navigate(['/seller']);
  }
}
