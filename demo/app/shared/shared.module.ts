import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCheckboxModule,
  MatCardModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  imports: [
  ],
  exports: [
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
  ]
})
export class SharedModule { }
