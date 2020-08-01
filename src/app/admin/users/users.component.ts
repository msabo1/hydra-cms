import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service'
import { User } from '../../core//users/user.model';
import { UsersService } from '../../core/users/users.service';
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

  loggedUser: User;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(user => this.loggedUser = user);
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
