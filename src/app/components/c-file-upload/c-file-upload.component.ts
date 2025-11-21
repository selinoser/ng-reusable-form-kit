import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  Injector,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';
import { FileNamesPipe } from '../../pipes/filenamepipes';

@Component({
  selector: 'c-file-upload',
  imports: [CommonModule, FileNamesPipe],
  templateUrl: './c-file-upload.component.html',
  styleUrl: './c-file-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CFileUploadComponent),
      multi: true
    }
  ]

})
export class CFileUploadComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() multiple = false;
  @Input() accept = ''; // örn: '.png,.jpg,.pdf'
  @Input() customErrors: Record<string, string> = {};

  @ViewChild('fileInput') fileInput!: ElementRef;

  files: File[] = [];
  disabled = false;
  control!: NgControl;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.control = this.injector.get(NgControl);
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this.files = value || [];
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onFileChange(event: any) {
    const selectedFiles = Array.from(event.target.files) as File[];
    this.files = this.multiple ? selectedFiles : selectedFiles.slice(0, 1);
    this.onChange(this.files);
    this.onTouched();
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';
    for (let key of Object.keys(this.control.errors)) {
      if (this.customErrors[key]) return this.customErrors[key];
    }
    if (this.control.errors['required']) return 'Bu alan zorunludur.';
    return 'Geçersiz dosya.';
  }
}
