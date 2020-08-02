import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../../core/users/users.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { UpdateUserDto } from '../../../core/users/dto/update-user.dto';
import { User } from '../../../core/users/user.model';
import { Role } from '../../../core/roles/role.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updatePassword: boolean = false;

  updateUserForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(),
    status: new FormControl(),
    role: new FormControl()
  });

  constructor(
    private readonly dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {user: User, roles: Role[]},
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    const {username, status, role} = this.updateUserForm.controls;
    username.setValue(this.data.user.username);
    status.setValue(this.data.user.status);
    role.setValue(this.data.user.role.id)
  }

  onSubmit(){
    const {username, password, status, role} = this.updateUserForm.controls;
    const updateUserDto: UpdateUserDto = {
      username: username.value,
      password: password.value ? password.value : undefined,
      status: status.value,
      roleId: role.value
    }
    this.usersService.update(this.data.user.id, updateUserDto).subscribe((user: User) => {
      if(user.id){
        this.messagesService.successMessage.next('User updated successfully!');
        this.dialogRef.close(true);
      }
    });
  }

  onClose(){
    this.dialogRef.close(false);
  }

}
