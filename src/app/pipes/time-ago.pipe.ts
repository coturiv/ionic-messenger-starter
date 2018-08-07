import { Pipe, PipeTransform } from '@angular/core';
import { format, distanceInWordsToNow, differenceInDays, isYesterday } from 'date-fns';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: any): string {
    if (isYesterday(value)) {
      return 'yesterday';
    }

    return differenceInDays(Date.now(), value) > 1 ? 
      format(value, 'MMM D, YYYY, H:mm:ss A') : distanceInWordsToNow(value, {addSuffix: true});
  }

}
