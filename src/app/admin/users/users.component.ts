import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  reloadSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  openCreateDialog(){
    const dialogRef: MatDialogRef<CreateUserComponent> = this.dialog.open(CreateUserComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(true);
      }
    })
  }

}
