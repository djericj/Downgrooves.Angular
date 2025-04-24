import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'urlFormat',
    standalone: false
})
export class UrlFormatPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }
}
