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

interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'c-select',
  imports: [CommonModule],
  templateUrl: './c-select.component.html',
  styleUrl: './c-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CSelectComponent),
      multi: true
    }
  ]
})
export class CSelectComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Seçiniz';
  @Input() options: SelectOption[] = [];
  @Input() customErrors: Record<string, string> = {};

  value: any = '';
  disabled = false;
  control!: NgControl;

  constructor(private injector: Injector) { }

  ngOnInit() {
    this.control = this.injector.get(NgControl);
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this.value = value;
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

  onSelectChange(event: any) {
    this.value = event.target.value;
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
