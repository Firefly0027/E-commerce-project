import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Timestamp',
})
export class TimestampPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const regex = /Timestamp\(seconds=(\d+), nanoseconds=(\d+)\)/;
    const match = regex.exec(value);
    if (match) {
      const seconds = parseInt(match[1], 10);
      const nanoseconds = parseInt(match[2], 10);
      return new Date(seconds * 1000 + nanoseconds / 1000000);
    }
    return null;
  }
}
