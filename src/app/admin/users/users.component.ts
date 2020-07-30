import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loggedUser: User;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe(user => this.loggedUser = user);
  }

}
