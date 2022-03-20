import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';

@Pipe({ name: 'formatReleaseDate' })
export class FormatReleaseDatePipe implements PipeTransform {
  transform(value: string): string {
    return moment_.utc(value).format('MMM d yyyy');
  }
}
