import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  form: FormGroup;

  countries = [
    { label: 'Türkiye', value: 'TR' },
    { label: 'Almanya', value: 'DE' },
    { label: 'Fransa', value: 'FR' }
  ];

  genders = [
    { label: 'Erkek', value: 'male' },
    { label: 'Kadın', value: 'female' },
    { label: 'Diğer', value: 'other' }
  ];

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      acceptTerms: [false, Validators.requiredTrue],
      country: ['', Validators.required],
      gender: ['', Validators.required],
      attachments: [null, Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      const attachments = this.form.get('attachments')?.value;
      const fileNames = attachments.map((f: File) => f.name).join(', ');
      window.alert(
        "Mail: " + this.form.get('email')?.value  + "\nMesaj: " + this.form.get('message')?.value + "\nKullanım Koşulu: " + this.form.get('acceptTerms')?.value + "\nÜlke: " + this.form.get('country')?.value + "\nCinsiyet: " + this.form.get('gender')?.value + "\nEkler: " + fileNames );
    } else {
      window.alert('Form geçersiz!');
    }
  }
}
