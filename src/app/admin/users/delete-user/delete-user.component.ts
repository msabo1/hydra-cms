import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private readonly usersService: UsersService,
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
      this.dialogRef.close(true);
    })

  }

}
