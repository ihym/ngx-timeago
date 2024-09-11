import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [],
  exports: [MatCheckboxModule, MatCardModule, MatSelectModule, FormsModule, CommonModule],
})
export class SharedModule {}
