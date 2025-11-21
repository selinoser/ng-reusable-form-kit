import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileNames' })
export class FileNamesPipe implements PipeTransform {
  transform(files: File[]): string {
    return files.map(f => f.name).join(', ');
  }
}
