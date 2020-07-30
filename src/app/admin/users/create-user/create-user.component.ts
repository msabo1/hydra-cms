import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { CreateUserDto } from '../../../models/create-user.dto'
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../models/user.model';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required),
    status: new FormControl(),
    role: new FormControl()
  });
  constructor(
    private readonly usersService: UsersService,
    private readonly dialogRef: MatDialogRef<CreateUserComponent>,
    private readonly messagesService: MessagesService
    ) { }

  ngOnInit(): void {
    this.createUserForm.controls.status.setValue('active');
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
        this.messagesService.message.next('New user created successfully!');
        this.dialogRef.close(true);
      }
    });
  }

  onClose(){
    this.dialogRef.close(false);
  }

}
