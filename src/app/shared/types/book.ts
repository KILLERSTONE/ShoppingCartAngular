export class Book {
  id!:number ;
  name!: string;
  author!: string;
  src!: string;
  amount!: number;
}

export interface BookWithQuantity extends Book{
  quantity:number;
}
