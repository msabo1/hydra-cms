import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
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
    const dialogRef = this.dialog.open(CreateUserComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.reloadSubject.next(true);
      }
    })
  }

}
