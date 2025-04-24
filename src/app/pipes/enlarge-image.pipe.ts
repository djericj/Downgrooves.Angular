import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enlargeImage' })
export class EnlargeImagePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('100x100', '500x500');
  }
}
