import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralMessageComponent } from './general-message/general-message.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { MessageComponent } from './message.component';
import { MessagesService } from './messages.service';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [MessageComponent, GeneralMessageComponent, ErrorMessageComponent, SuccessMessageComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [],
  exports: [
    MessageComponent
  ]
})
export class MessagesModule { }
