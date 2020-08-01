import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralMessageComponent } from './general-message/general-message.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { MessageComponent } from './message.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MessagesService } from './messages.service';



@NgModule({
  declarations: [MessageComponent, GeneralMessageComponent, ErrorMessageComponent, SuccessMessageComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [MessagesService],
  exports: [
    MessageComponent,
    MessagesService
  ]
})
export class MessagesModule { }
