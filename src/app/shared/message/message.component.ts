import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from '../../services/messages.service';

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
    this.messages.message.subscribe((message) => this.openSnackBar(message));
  }

  openSnackBar(message: string){
    this.snackBar.open(message, null, {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
