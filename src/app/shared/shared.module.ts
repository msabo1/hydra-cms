import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { GeneralMessageComponent } from './message/general-message/general-message.component';
import { ErrorMessageComponent } from './message/error-message/error-message.component';
import { SuccessMessageComponent } from './message/success-message/success-message.component';

@NgModule({
  declarations: [MessageComponent, GeneralMessageComponent, ErrorMessageComponent, SuccessMessageComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  exports: [MessageComponent]
})
export class SharedModule { }
