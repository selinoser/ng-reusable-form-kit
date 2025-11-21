import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';

// Standalone Components
import { CInputComponent } from '../components/c-input/c-input.component';
import { CCheckboxComponent } from '../components/c-checkbox/c-checkbox.component';
import { CSelectComponent } from '../components/c-select/c-select.component';
import { CRadioComponent } from '../components/c-radio/c-radio.component';
import { CFileUploadComponent } from '../components/c-file-upload/c-file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CInputComponent,
    CCheckboxComponent,
    CSelectComponent,
    CRadioComponent,
    CFileUploadComponent,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CInputComponent,
    CCheckboxComponent,
    CSelectComponent,
    CRadioComponent,
    CFileUploadComponent,
  ]
})
export class SharedModule {}
