import { Component, OnInit } from '@angular/core';
import { PrivilegesService } from '../../../core/privileges/privileges.service';
import { Role } from '../../../core/roles/role.model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MessagesService } from '../../../core/messages/messages.service';
import { RolesService } from '../../../core/roles/roles.service';
import { Privilege } from '../../../core/privileges/privilege.model';
import { CreateRoleDto } from '../../../core/roles/dto/create-role.dto';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  permissions: {name: string}[];
  groups: {name: string}[];

  tableColumns: string[] = ['group'];

  privileges: FormControl[] = [];
  name: FormControl = new FormControl(null, Validators.required);

  constructor(
    private readonly privilegesService: PrivilegesService,
    private readonly dialogRef: MatDialogRef<CreateRoleComponent>,
    private readonly messagesService: MessagesService,
    private readonly rolesService: RolesService 
  ) { }

  ngOnInit(): void {
    this.privilegesService.getPermissions().subscribe((permissions) =>{
      this.permissions = permissions;
      permissions.forEach(permission => this.tableColumns.push(permission.name));
      this.privilegesService.getGroups().subscribe((groups) => {
        this.groups = groups;
        permissions.forEach((permission) => {
          groups.forEach((group) => {
            this.privileges[`${permission.name}${group.name}`] = new FormControl();
          });
        });
      });
    });
  }

  onClose(){
    this.dialogRef.close(false);
  }

  onSave(){
    const privileges: Privilege[] = [];
    this.permissions.forEach((permission) => {
      this.groups.forEach((group) => {
        if(this.privileges[`${permission.name}${group.name}`].value){
          privileges.push({permission, group});
        }
      });
    });
    const createRoleDto: CreateRoleDto = {name: this.name.value, privileges};
    this.rolesService.create(createRoleDto).subscribe((role: Role) => {
      if(role){
        this.messagesService.successMessage.next('Role created successfully!')
        this.dialogRef.close(true);
      }
    });
  }

}
