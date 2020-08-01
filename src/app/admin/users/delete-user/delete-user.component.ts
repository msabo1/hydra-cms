import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../../core/users/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from '../../../shared/messages/messages.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
    private readonly dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) private id: string
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.dialogRef.close(false);
  }

  onDelete(){
    this.usersService.delete(this.id).subscribe(() => {
      this.messagesService.successMessage.next('User deleted successfully!');
      this.dialogRef.close(true);
    })

  }

}
