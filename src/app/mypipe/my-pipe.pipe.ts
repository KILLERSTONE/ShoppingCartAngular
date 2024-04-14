import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(value: any): string {
    if (value === null) {
      return 'null';
    } else if (typeof value === 'object') {
      return 'object';
    } else {
      return typeof value;
    }
  }

}
