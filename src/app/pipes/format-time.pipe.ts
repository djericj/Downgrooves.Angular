import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';

@Pipe({ name: 'formatTrackTime' })
export class FormatTrackTimePipe implements PipeTransform {
  transform(value: number): string {
    return moment_.utc(value).format('mm:ss');
  }
}
