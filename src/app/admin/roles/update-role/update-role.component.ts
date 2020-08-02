import { Component, OnInit, Inject } from '@angular/core';
import { PrivilegesService } from '../../../core/privileges/privileges.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../../core/roles/role.model';
import { FormControl, Validators } from '@angular/forms';
import { RolesService } from '../../../core/roles/roles.service';
import { MessagesService } from '../../../core/messages/messages.service';
import { Privilege } from '../../../core/privileges/privilege.model';
import { UpdateRoleDto } from '../../../core/roles/dto/update-role.dto';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  permissions: {name: string}[];
  groups: {name: string}[];

  tableColumns: string[] = ['group'];

  privileges: FormControl[] = [];
  name: FormControl = new FormControl(this.role.name, Validators.required);

  constructor(
    private readonly privilegesService: PrivilegesService,
    @Inject(MAT_DIALOG_DATA) public role: Role,
    private readonly dialogRef: MatDialogRef<UpdateRoleComponent>,
    private readonly messagesService: MessagesService,
    private readonly rolesService: RolesService 
  ) { }

  ngOnInit(): void {
    this.role = new Role(this.role);
    this.privilegesService.getPermissions().subscribe((permissions) =>{
      this.permissions = permissions;
      permissions.forEach(permission => this.tableColumns.push(permission.name));
      this.privilegesService.getGroups().subscribe((groups) => {
        this.groups = groups;
        permissions.forEach((permission) => {
          groups.forEach((group) => {
            this.privileges[`${permission.name}${group.name}`] = new FormControl();
            if(this.role.hasPrivilege(permission.name, group.name)){
              this.privileges[`${permission.name}${group.name}`].setValue(true);
            }
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
    const updateRoleDto: UpdateRoleDto = {name: this.name.value, privileges};
    this.rolesService.update(this.role.id, updateRoleDto).subscribe((role) => {
      if(role){
        this.messagesService.successMessage.next('Role updated successfully!')
        this.dialogRef.close(true);
      }
    });
  }
}
