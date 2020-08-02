import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from './messages.service';
import { GeneralMessageComponent } from './general-message/general-message.component';
import { ComponentType } from '@angular/cdk/portal';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    private readonly messages: MessagesService,
    private readonly snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    console.log(this.messages);
    this.messages.message.subscribe((message) => this.openSnackBar(message, GeneralMessageComponent));
    this.messages.errorMessage.subscribe((message: string) => this.openSnackBar(message, ErrorMessageComponent));
    this.messages.successMessage.subscribe((message: string) => this.openSnackBar(message, SuccessMessageComponent));
  }

  openSnackBar(message: string | string[], component: ComponentType<unknown>){
    let stringMessage: string;
    if(typeof message == 'object'){
      stringMessage = message.reduce((acc: string, message: string) => acc + message + '\n');
    }else{
      stringMessage = message;
    }

    const wordCount: number = stringMessage.split(' ').length;
    this.snackBar.openFromComponent(component, {
      duration: wordCount*200 + 100,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: stringMessage
    });
  }

}
