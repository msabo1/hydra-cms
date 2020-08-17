import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonToggleModule
  ],
  exports: [
      MatInputModule,
      MatFormFieldModule,
      MatDividerModule,
      MatButtonToggleModule
  ]
})
export class MaterialModule { }
