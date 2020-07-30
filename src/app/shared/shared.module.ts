import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [MessageComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [MessageComponent]
})
export class SharedModule { }
