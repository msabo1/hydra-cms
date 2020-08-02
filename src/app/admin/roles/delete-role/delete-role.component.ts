import { Component, OnInit, Inject } from '@angular/core';
import { RolesService } from '../../../core/roles/roles.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../users/delete-user/delete-user.component';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.css']
})
export class DeleteRoleComponent implements OnInit {

  constructor(
    private readonly rolesService: RolesService,
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
    this.rolesService.delete(this.id).subscribe(() => {
      this.messagesService.successMessage.next('Role deleted successfully!');
      this.dialogRef.close(true);
    })

  }

}
