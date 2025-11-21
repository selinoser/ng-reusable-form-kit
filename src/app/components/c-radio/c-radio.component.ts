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

interface RadioOption {
  label: string;
  value: any;
}

@Component({
  selector: 'c-radio',
  imports: [CommonModule],
  templateUrl: './c-radio.component.html',
  styleUrl: './c-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CRadioComponent),
      multi: true
    }
  ]
})
export class CRadioComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() options: RadioOption[] = [];
  @Input() name = '';
  @Input() customErrors: Record<string, string> = {};

  value: any;
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

  onRadioChange(value: any) {
    this.value = value;
    this.onChange(value);
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
