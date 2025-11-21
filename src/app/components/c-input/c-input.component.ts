import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  Injector
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'c-input',
  imports: [CommonModule],
  templateUrl: './c-input.component.html',
  styleUrl: './c-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CInputComponent),
      multi: true
    }
  ]
})
export class CInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';

  @Input() icon?: string; 
  @Input() textarea = false;
  @Input() rows = 3;

  @Input() customErrors: Record<string, string> = {};

  value: any = '';
  disabled = false;

  control!: NgControl;

  constructor(private injector: Injector) {}

  ngOnInit() {
    this.control = this.injector.get(NgControl);
  }

  writeValue(value: any): void {
    this.value = value;
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

  onInput(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    const errors = this.control.errors;

    for (let key of Object.keys(errors)) {
      if (this.customErrors[key]) {
        return this.customErrors[key];
      }
    }

    if (errors['required']) return 'Bu alan zorunludur.';
    if (errors['minlength'])
      return `En az ${errors['minlength'].requiredLength} karakter olmalıdır.`;
    if (errors['maxlength'])
      return `En fazla ${errors['maxlength'].requiredLength} karakter olabilir.`;
    if (errors['email']) return 'Geçerli bir e-posta adresi giriniz.';

    return 'Geçersiz değer.';
  }

}
