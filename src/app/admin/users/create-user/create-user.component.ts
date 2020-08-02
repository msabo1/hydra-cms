import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../../core/users/users.service';
import { CreateUserDto } from '../../../core/users/dto/create-user.dto'
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../core/users/user.model';
import { MessagesService } from '../../../core/messages/messages.service';
import { Role } from '../../../core/roles/role.model';
import { RolesService } from '../../../core/roles/roles.service';
import { AuthService } from '../../../core/auth/auth.service';
import { QueryResponse } from '../../../core/models/query-response.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  roles: Role[];

  createUserForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required),
    status: new FormControl('active'),
    role: new FormControl(null, Validators.required)
  });
  constructor(
    private readonly usersService: UsersService,
    private readonly dialogRef: MatDialogRef<CreateUserComponent>,
    private readonly messagesService: MessagesService,
    private readonly rolesService: RolesService,
    private readonly authService: AuthService
    ) { }

  ngOnInit(): void {
    if(this.authService.hasPrivilege('read', 'roles')){
      this.rolesService.get().subscribe((rolesResponse: QueryResponse<Role>) => {
        this.roles = rolesResponse.data;
      });
    }
  }

  onSubmit(){
    const {username, password, status, role} = this.createUserForm.controls;
    const createUserDto: CreateUserDto = {
      username: username.value,
      password: password.value,
      status: status.value,
      roleId: role.value
    }
    this.usersService.create(createUserDto).subscribe((user: User) => {
      if(user.id){
        this.messagesService.successMessage.next('New user created successfully!');
        this.dialogRef.close(true);
      }
    });
  }

  onClose(){
    this.dialogRef.close(false);
  }

}
