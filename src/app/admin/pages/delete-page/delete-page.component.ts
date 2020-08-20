import { Component, OnInit, Inject } from '@angular/core';
import { PagesService } from '../../../core/pages/pages.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-page',
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeletePageComponent implements OnInit {

  constructor(
    private readonly pagesService: PagesService,
    private readonly messagesService: MessagesService,
    private readonly dialogRef: MatDialogRef<DeletePageComponent>,
    @Inject(MAT_DIALOG_DATA) private id: string
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close(false);
  }

  onDelete(){
    this.pagesService.delete(this.id).subscribe(() => {
      this.messagesService.successMessage.next('Page deleted successfully!');
      this.dialogRef.close(true);
    })

  }

}
