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
  NgControl
} from '@angular/forms';

@Component({
  selector: 'c-checkbox',
  imports: [CommonModule],
  templateUrl: './c-checkbox.component.html',
  styleUrl: './c-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CCheckboxComponent),
      multi: true
    }
  ]
})
export class CCheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() customErrors: Record<string, string> = {};

  value = false;
  disabled = false;
  control!: NgControl;

  constructor(private injector: Injector) { }

  ngOnInit() {
    this.control = this.injector.get(NgControl);
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this.value = !!value;
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  onCheckboxChange(event: any) {
    this.value = event.target.checked;
    this.onChange(this.value);
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';
    for (let key of Object.keys(this.control.errors)) {
      if (this.customErrors[key]) return this.customErrors[key];
    }
    if (this.control.errors['required']) return 'Bu alan zorunludur.';
    return 'Geçersiz değer.';
  }
}
