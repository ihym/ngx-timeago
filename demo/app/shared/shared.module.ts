import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [],
  exports: [MatCheckboxModule, MatCardModule, MatSelectModule, FormsModule, CommonModule],
})
export class SharedModule {}
