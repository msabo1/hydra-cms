import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateRoleComponent } from './create-role/create-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  reloadSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateDialog(){
    const dialogRef: MatDialogRef<CreateRoleComponent> = this.dialog.open(CreateRoleComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(result);
      }
    });
  }

}
