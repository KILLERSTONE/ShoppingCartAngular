import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'app/books/book/book.service';
import { Book } from 'app/shared/types/book';
import { CurdService } from '../curd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  addBookForm: FormGroup;

  duplicateId=false;
  constructor(private formBuilder: FormBuilder, private curdService:CurdService) {
    this.addBookForm = this.formBuilder.group({
      ID:['',Validators.required],
      name: ['', Validators.required],
      author: ['', Validators.required],
      src: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addBookForm.valid) {
      const newBook: Book = {
        id: this.addBookForm.value.ID,
        name: this.addBookForm.value.name,
        author: this.addBookForm.value.author,
        src: this.addBookForm.value.src,
        amount: this.addBookForm.value.amount
      };

      this.duplicateId=this.curdService.checkId(newBook.id);
      if(!this.duplicateId)this.curdService.addBook(newBook)


      this.addBookForm.reset();
    }
  }
}
